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
                        <span class="help is-tip">您当前的版本为：教育版</span>

                        <hr class="split">

                        <article class="message" v-for="item in fields"  >
                            <div class="message-body">
                                <div class="message-title">
                                    <h4>{{item.name}}</h4>
                                    <div class="meal-set-right">
                                        <a class="button is-small"><i class="fa fa-check"></i></a>
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
                                  <strong>专业版</strong>
                                </p>
                                <div class="media-right">
                                    20.00 元/月
                                </div>

                              </div>
                            </div>
                        </article>

                        <hr class="split">

                        <cyc></cyc>

                        <pay-method :val.sync="qrcode" @weixin="useWeixin" @alipay="useAlipay"></pay-method>

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
                        <p class="title is-5" style="margin-bottom:7px">个人版</p>
                        <p class="subtitle is-6" style="margin-top:0px">免费</p>
                        <div class="text-right">
                            <a @click="changeSetMeal" class="button is-small is-warning">更改</a>
                        </div>
                      </div>
                    </div>

                    <div class="content">
                        已创建 10 个项目
                      <br>
                      <small>到期时间：2016-12-07</small>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <hr>

<!-- 
            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="基础信息">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>名称</th>
                        <th>创建时间</th>
                        <th>到期时间</th>
                        <th>版本</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Gospel_Volume</td>
                        <td>2015-12-07</td>
                        <td>
                          2016-12-07
                        </td>
                        <td>个人版</td>
                        <td class="is-icon" title="升降级">
                          <a @click="reNewIDE">
                            <i class="fa fa-level-up"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </tab-item>
                <tab-item title="磁盘信息">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>磁盘名称</th>
                        <th>磁盘类型</th>
                        <th>创建时间</th>
                        <th>容量</th>
                        <th>剩余</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Gospel_volume</td>
                        <td>IDE专用存储卷</td>
                        <td>2015-12-07</td>
                        <td>
                          20 GB
                        </td>
                        <td>10 GB</td>
                        <td class="is-icon" title="升降级">
                          <a @click="renewIDEVolumeForm = true">
                            <i class="fa fa-level-up"></i>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </tab-item>
            </tab> -->

            <modal :is-html="true" :is-show.sync="renewIDEVolumeForm">
                <div slot="header">升降级IDE专用数据卷</div>
                <div slot="body">

                    <div class="control is-horizontal user-center">
                      <div class="control-label">
                        <label class="label">数据卷大小</label>
                      </div>
                      <div class="control is-grouped" style="margin-left:16px">
                        <div class="columns">
                            <div class="column is-10">
                                <input v-model="volume.size" min="10" max="100" step="10" class="slider" type="range" style="margin-top:14px">
                            </div>
                            <div class="column is-10">
                                <span class="help is-tip" style="margin: 8px;">{{volume.size}} G</span>
                            </div>
                        </div>
                      </div>
                    </div>

                    <div class="control is-horizontal user-center">
                      <div class="control-label">
                        <label class="label">支付方式</label>
                      </div>
                    </div>

                    <pay-method :val.sync="qrcode" @weixin="useWeixin" @alipay="useAlipay"></pay-method>

                    <div class="media-content">
                      <div class="content">
                        <div class="media-right" style="text-align:right">
                            <span class="is-tip">合计：</span>
                            <span class="is-big">1200.00 元</span>
                        </div>
                      </div>
                    </div>

                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="confirmRenewIDEVolume">
                    确定
                    </button>
                    <button class="button" @click="renewIDEVolumeForm = false">取消</button>
                </div>
            </modal>

            <modal :is-html="true" :is-show.sync="showRenewForm">
                <div slot="header">升级时长</div>
                <div slot="body">
                    <label class="label">升级时长</label>
                    <p class="control">
                      <cyc :show-tips="false"></cyc>
                    </p>
                    <label class="label">选择主版本</label>
                    <p class="control">
                      <span class="select" >
                        <select v-model="selected">
                          <option v-for="item in fields" :value="item" >{{item.name}}</option>
                        </select>
                      </span>
                    </p>
                    <pay-method :val.sync="qrcode" @weixin="useWeixin" @alipay="useAlipay"></pay-method>
                    <div class="media-content">
                      <div class="content">
                        <div class="media-right" style="text-align:right">
                            <span class="is-tip">合计：</span>
                            <span class="is-big">{{price}} 元</span>
                        </div>
                      </div>
                    </div>
                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="confirmRenew">
                    确定
                    </button>
                    <button class="button" @click="showRenewForm = false">取消</button>
                </div>
            </modal>
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

                renewIDEVolumeForm: false,
                fields: [],
                price: 1,
                unitPrice: 0,
                size: 1,
                products: '',
                volume: {
                  size: 20
                },

                isWeixin: false,

                qrcode: 'http://www.baidu.com',

                currentIDE: '1',
                fields: [],
                showTopupForm: false,
                showSetMealForm: false,

                isWechat: true,
                isAlipay: false,
                setMeal: {
                    totalStep: 2,
                    currentStep: 1
                }

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
            initIdes: function() {

                var _self = this;
                services.Common.list({
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
                services.Common.list({
                  param:{
                    type: 'ide'
                  },
                  url: 'products',
                  cb: function(res){

                        if(res.status == 200){

                            var data = res.data;
                            if(data.code == 1){

                                console.log(data.fields);
                                var show = new Array();
                                for(var i = 0; i<= data.fields.length-1; i++){
                                    if(data.fields[i].id != _self.currentIDE){
                                      show.push(data.fields[i])
                                    }
                                }
                                console.log(show);
                                _self.fields = show;
                            }
                        }

                  }
                });
            }

        },
        ready: function() {

            this.$get("initIdes")();
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
