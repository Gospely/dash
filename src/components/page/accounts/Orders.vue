<template>
    <div class="container">
        <h1 class="title">交易记录</h1>
        <hr>
        <div class="content">

            <modal :is-html="true" :is-show.sync="showRePayForm">
                <div slot="header">继续支付</div>
                <div slot="body">
                    <label class="label">所购产品</label>
                    <p class="control">
                      {{description}}
                    </p>
                    <pay-method :val.sync="qrcode"></pay-method>
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
                    确定支付
                    </button>
                    <button class="button" @click="showRePayForm = false">取消</button>
                </div>
            </modal>

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="已支付">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>订单名称</th>
                          <th>订单编号</th>
                          <th>交易时间</th>
                          <th>订单金额</th>
                          <th>状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields">
                          <td>{{item.name}}</td>
                          <td>{{item.orderNo}}</td>
                          <td>{{item.createat | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</td>
                          <td>
                            {{item.price}} RMB
                          </td>
                          <td>
                            已支付
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </tab-item>
                <tab-item title="未支付">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>订单名称</th>
                          <th>订单编号</th>
                          <th>交易时间</th>
                          <th>订单金额</th>
                          <th>状态</th>
                          <th>操作</th>
                          <th></th>

                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_unpay">
                            <td>{{item.name}}</td>
                            <td>{{item.orderNo}}</td>
                            <td>{{item.createat | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</td>
                            <td>
                              {{item.price}} RMB
                            </td>
                            <td>
                              未支付
                            </td>
                            <td class="is-icon" title="继续支付">
                            <a @click="continueToPay(item)">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                          <td class="is-icon" title="取消订单">
                            <a @click="cancelOrder(item)">
                              <i class="fa fa-times "></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </tab-item>
            </tab>

        </div>
    </div>
</template>
<style>
</style>
<script>

    import Vue from 'vue'
    import {Tab, TabItem} from '../../ui/Tab'
    import Modal from '../../ui/Modal/Modal.vue'
    import Page from '../../ui/Page/Page.vue'

    import PayMethod from '../../ui/PayMethod.vue';

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                msg: 'hello vue',
                fields: [],
                fields_unpay: [],
                qrcode: 'test',
                showRePayForm: false,
                price: '',
                description: '',
                isWechat: false,
                isAlipay: true
            }
        },
        components: {
            Tab,
            TabItem,
            Modal,
            PayMethod,
            Page
        },
        ready : function() {
          this.$get('initPage')();
        },
        methods: {
            cancelOrder: function() {

                new ModalCtrl({
                    el: document.createElement('div'),
                    props: {
                        isShow: false,
                        header: {
                            default: '取消订单'
                        },
                        body: {
                            default: '您确定要取消此订单吗？'
                        }
                    },
                    events: {
                        'confirmed': function() {
                            this.$destroy(true);
                        }
                    }
                }).show();

            },

            continueToPay: function(item) {

              this.showRePayForm = true;
              var _self = this;
              this.showRenewForm = true;
              this.price = item.price;
              this.description =  item.name;

              services.OrderService.order({

                out_trade_no: item.orderNo,
                price: item.price,
                type: 'wechat'
              }).then(function(res){
                  console.log(res);
                  _self.qrcode = res.data.code_url;
                  //window.location.href = res.body;
              },function(err,res){

              });

            },
            confirmRenew: function() {
              if(this.isAlipay){
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
              }else{
                notification.alert("请确认微信扫码支付完成");
              }
            },
            initPage: function() {

              var _self = this;
              services.Common.list({
                param: {
                  status: 2,
                  creator: currentUser,
                },
                ctx: _self,
                url: 'orders'
              });
              services.Common.list({
                param: {
                  status: 1,
                  creator: currentUser,

                },
                ctx: _self,
                url: 'orders',
                target: 'fields_unpay'
              });
            }
        },
        events:{
          'weixin': function() {

            console.log("wechat");
            this.isWechat = true;
            this.isAlipay = false;
          },
          'alipay': function() {
            this.isWechat = false;
            this.isAlipay = true;
          }
        }
    }
</script>
