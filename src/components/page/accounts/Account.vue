<template>
    <div class="container">
        <h1 class="title">账户信息</h1>
        <hr>
        <div class="content">

            <modal :is-html="true" :is-show.sync="showTopupForm">
                <div slot="header">账户充值</div>
                <div slot="body">
                    <label class="label">充值金额</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="请输入充值金额">
                    </p>
                    <label class="label">支付方式</label>
                    <pay-method :val.sync="qrcode" @weixin="useWeinxin" @alipay="useAlipay"></pay-method>
                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="toTopup">
                    确定
                    </button>
                    <button class="button" @click="showTopupForm = false">取消</button>
                </div>
            </modal>

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

<!--             <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">账户余额</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <span class="is-tip" style="line-height: 2.3;">¥ 0.00 元</span>
                    <button style="margin-left:10px" class="button is-primary" @click="topUp">充值</button>
                </p>
              </div>
            </div>

            <hr> -->

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
                      <small>到期时间：无限期</small>
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

    import Modal from '../../ui/Modal/Modal.vue'
    import Cyc from '../../ui/Cyc.vue'

    import PayMethod from '../../ui/PayMethod.vue'

    export default{
        data () {
            return {
                currentIDE: '1',
                fields: [],
                showTopupForm: false,
                showSetMealForm: false,

                isWechat: true,
                isAlipay: false,
                qrcode: 'ssasdsadas',
                setMeal: {
                    totalStep: 2,
                    currentStep: 1
                }
            }
        },

        components: {
            Modal,
            Cyc,
            PayMethod
        },

        methods: {
            topUp: function() {
                this.showTopupForm = true;
                console.log('topup');
            },

            toTopup: function() {

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
        ready: function(){
            this.$get("initIDE")();
        }
    }
</script>
