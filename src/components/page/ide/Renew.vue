<template>
    <div class="container">
        <h1 class="title">Gospel集成开发环境</h1>
        <h2 class="subtitle">在这里您可以续费您的<strong>Gospel集成开发环境</strong></h2>
        <hr>
        <div class="content">

            <modal :is-html="true" :is-show.sync="showSetMealForm">
                <div slot="header">版本</div>
                <div slot="body">

                    <div v-show="setMeal.currentStep == 1" class="step1">
                        <span class="help is-tip">您当前的版本为：{{ide.name}}</span>

                        <hr class="split">

                        <article class="message" v-for="(key, item) in fields"  >
                            <div class="message-body">
                                <div class="message-title">
                                    <h4>{{item.name}}</h4>
                                    <div class="meal-set-right">
                                        <a class="button is-small" v-bind:class="{'is-success': item.active}" @click="chooseIde(item, key)"><i class="fa fa-check"></i></a>
                                    </div>
                                    <hr class="split">
                                </div>
                                {{item.description}}
                            </div>
                        </article>

                    </div>

                    <div v-show="setMeal.currentStep == 2" class="step2">

                        <span class="help is-tip">您将要订购的套餐（从 2016年09月20日到 2016年10月20日）：</span>

                        <hr class="split">

                        <article class="media">
                            <div class="media-left">
                              <figure class="image is-64x64">
                                <span class="icon is-big" style="font-size:50px;height:64px;width:64px;line-height:1;">
                                  <i class="fa fa-star"></i>
                                </span>
                              </figure>
                            </div>
                            <div class="media-content">
                              <div class="content">
                                <p>
                                  <strong>{{ide_choose}}</strong>
                                </p>
                                <div class="media-right">
                                    {{unitPrice}} 元/月
                                </div>

                              </div>
                            </div>
                        </article>

                        <hr class="split">

                        <p class="control">
                          <cyc :show-tips="false"></cyc>
                        </p>
                        <div class="media-content">
                          <div class="content">
                            <div class="media-right" style="text-align:right">
                                <span class="is-tip">合计：</span>
                                <span class="is-big">{{price}} 元</span>
                            </div>
                          </div>
                        </div>
                        <pay-method :val.sync="qrcode" @weixin="useWeixin" @alipay="useAlipay"　></pay-method>

                    </div>

                </div>
                <div slot="footer">
                    <button v-show="!(setMeal.currentStep != setMeal.totalStep)" class="button is-success"
                        @click="setMealPrevStep">
                    上一步
                    </button>

                    <button v-show="setMeal.currentStep == 1" class="button is-success"
                        @click="setMealNextStep">
                    下一步
                    </button>

                    <button v-show="setMeal.currentStep == setMeal.totalStep" class="button is-primary"
                        @click="chooseSetMeal">
                    确认订购
                    </button>

                    <button class="button" @click="showSetMealForm = false">取消</button>
                </div>
            </modal>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">当前IDE版本</label>
              </div>
              <div class="control">

                <div class="card set-meal">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image" style="width:30px;height:30px">
                            <span class="icon is-big" style="font-size:30px;height:100%;width:30px;line-height:1">
                              <i class="fa fa-star"></i>
                            </span>
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-5" style="margin-bottom:7px">{{ide.name}}</p>
                        <p class="subtitle is-6" style="margin-top:0px" v-show = "isFree" >免费</p>
                        <div class="text-right">
                            <a @click="changeSetMeal" class="button is-small is-warning">更改</a>
                        </div>
                      </div>
                    </div>

                    <div class="content">
                        已创建 {{applicationsCount}} 个项目
                      <br>
                      <small>到期时间：{{ide.expireAt}}</small>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <hr>
        </div>
    </div>
</template>
<style>

    .set-meal {
        box-shadow: none;
        border: 1px solid #d3d6db;
    }

    .text-right {
        right: 20px;
        top: 20px;
        position: absolute;
    }

    .meal-set-right {
        text-align: right;
        margin-top: -38px;
    }

    .media-right {
        text-align: right;
    }

</style>
<script>

    import {Tab, TabItem} from '../../ui/Tab'
    import IdeState from './IDEState'
    import Modal from '../../ui/Modal/Modal.vue'

    import Slider from 'vue-bulma-slider'
    import Cyc from '../../ui/Cyc.vue'

    import PayMethod from '../../ui/PayMethod.vue'

    export default{
        data () {
            return {
                isRefresh: false,
                showRenewForm: false,

                isOther: false,
                otherTime: '其它',

                ide: '',
                price: 1,
                unitPrice: 0,
                size: 1,
                products: '',
                volume: {
                  size: 20
                },

                isWeixin: false,
                isFree: false,
                qrcode: 'http://www.baidu.com',
                currentIDE: localStorage.getItem('ide'),
                fields: [],
                applicationsCount: '',
                expireAt: '',
                ide_choose: '',
                showTopupForm: false,
                showSetMealForm: false,

                isWechat: true,
                isAlipay: false,
                setMeal: {
                    totalStep: 2,
                    currentStep: 1
                },

                mealTicks: []

            }
        },
        components: {
            Tab,
            TabItem,
            IdeState,
            Modal,
            Slider,
            Cyc,
            PayMethod
        },

        methods: {
            reNewIDE: function() {

                var _self = this;
                this.showRenewForm = true;
                services.OrderService.order({
                  products: this.products,
                  price: this.size * this.unitPrice,
                  size: this.size,
                  unitPrice: this.unitPrice,
                  type: 'wechat'
                }).then(function(res){
                    console.log(res);
                    _self.qrcode = res.data.code_url;
                    //window.location.href = res.body;
                },function(err,res){

                });
            },
            confirmRenew: function() {
                services.OrderService.order({
                  products: this.products,
                  price: this.size * this.unitPrice,
                  size: this.size,
                  unitPrice: this.unitPrice
                }).then(function(res){
                    console.log(res);
                    window.location.href = res.body;
                },function(err,res){

                });
            },
            confirmRenewIDEVolume: function() {

            },
            chooseIde: function(item, key) {
              console.log(item, this.fields[key]);
              this.fields[key].active = true;
              this.unitPrice = item.price;
              this.ide_choose = item.name;
            },
            initIdes: function() {

                var _self = this;
                services.Common.list({
                    param: {
                      type: 'ide'
                    },
                    url: "products",
                    ctx: _self
                });
            },

            useWeixin: function() {

            },

            useAlipay: function() {

            },

            changeSetMeal: function() {

                this.showSetMealForm = true;
            },

            chooseSetMeal: function() {

                this.showSetMealForm = false;
                this.showTopupForm = true;
                this.genQrcode();
            },

            setMealNextStep: function() {
                this.setMeal.currentStep++;
            },

            setMealPrevStep: function() {
                this.setMeal.currentStep--;
            },

            useAlipay: function() {

            },

            useWeinxin: function() {

            },
            genQrcode: function() {

                var _self = this;
                this.showRenewForm = true;
                services.OrderService.order({
                  products: this.products,
                  price: this.size * this.unitPrice,
                  size: this.size,
                  unitPrice: this.unitPrice,
                  type: 'wechat'
                }).then(function(res){
                    console.log(res);
                    _self.qrcode = res.data.code_url;
                    //window.location.href = res.body;
                },function(err,res){

                });
            },
            initIDE: function(){

                var _self = this;
                console.log(this);
                services.Common.list({
                  param:{
                    type: 'ide'
                  },
                  url: 'products',
                  cb: function(res){

                        if(res.status == 200){

                            var data = res.data;
                            console.log(data);
                            if(data.code == 1){

                                console.log(data.fields);
                                var show = new Array();
                                for(var i = 0; i<= data.fields.length-1; i++){
                                    if(data.fields[i].id != _self.currentIDE){
                                      show.push(data.fields[i])
                                    }else{
                                      _self.unitPrice =  data.fields[i].price;
                                      _self.ide_choose =  data.fields[i].name;
                                    }
                                }
                                console.log(show);
                                _self.fields = show;
                            }
                        }

                  }
                });

                services.Common.count({
                    url: 'applications',
                    param: {
                        creator: currentUser
                    },
                    cb: function(res){
                          if(res.status == 200){
                              var data = res.data;
                              if(data.code == 1){
                                  _self.applicationsCount = data.fields;
                              }
                          }
                    }
                });
                
                var ide = localStorage.getItem('ide');
                services.Common.getOne({
                   param: {
                     id: ide
                   },
                   url: "ides",
                   cb: function(res) {
                     if(res.status == 200){
                         var data = res.data;
                         if(data.code == 1){
                             _self.ide = data.fields;
                         }
                     }
                   }
                 });
            }
        },

        ready: function() {
            this.$get("initIDE")();
        },
        watch: {
           selected: function(item) {
              this.products = item.id;
              this.unitPrice = item.price;
              this.price = this.unitPrice +" X 1 月 = "+this.unitPrice;
              this.reNewIDE();
           }
       },
       events: {
         'cycSelected': function(cyc) {

             this.size = cyc.cyc;
             this.total = cyc.cyc * this.unitPrice;
             this.price = this.unitPrice +" X "+ cyc.cyc+" "+cyc.unit +" = "+this.total;
             console.log(cyc);
             this.reNewIDE();
         }
       }
    }
</script>
