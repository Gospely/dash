<template>
    <div class="container">
        <h1 class="title">交易记录</h1>
        <hr>
        <div v-show="ordersLoaded" class="content">

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

            <tab :active-index = "activeTab" style= "width: 100%;">
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
                    <article class="noData" v-if="!fields.length">
                      暂无已支付订单
                    </article>
                    <page :cur.sync="cur" :all.sync="all" v-on:btn-click="listen"></page>
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
                    <article class="noData" v-if="!fields_unpay.length">
                      暂无未支付订单
                    </article>
                    <page :cur.sync="cur1" :all.sync="all1" v-on:btn-click="listen1"></page>
                </tab-item>
            </tab>

        </div>

        <loading v-show="!ordersLoaded"><loading>

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
                cur: 1,
                all: 1,
                cur1: 1,
                all1: 1,
                qrcode: 'test',
                alipayUrl: '',
                showRePayForm: false,
                price: '',
                description: '',
                orderNo:'',
                isWechat: false,
                isAlipay: true,
                activeTab: 0,

                ordersLoaded: false
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
            var code = this.$route.query.code;
            if(code == 'pay'){
                this.activeTab = 0;
                services.Common.getOne({
                    url: 'users',
                    param: {
                        id: currentUser
                    },
                    cb: function(res){
                        localStorage.setItem("ideName",res.data.fields.ideName);
                        localStorage.orderNo='';

                    }
                });
            }
            this.$get('initPaid')(1);
            this.$get('initUnPay')(1);
        },
        methods: {
            cancelOrder: function(item) {
                var _self = this;
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

                            services.Common.delete({
                              url: 'orders',
                              param: {
                                id: item.id
                              },
                              ctx: _self,
                              target: 'fields_unpay',
                              reload: function(){
                                  _self.$get('initPaid')(1);
                                  _self.$get('initUnPay')(1);
                              }
                            })
                            this.$destroy(true);
                        }
                    }
                }).show();

            },
            listen: function(data) {
              this.$get('initPaid')(data);
            },
            listen1: function(data) {
              this.$get('initUnPay')(data);
            },
            continueToPay: function(item) {
              this.showRePayForm = true;
              var _self = this;
              this.showRenewForm = true;
              this.price = item.price;
              this.orderNo = item.orderNo;
              this.description =  item.name;
              this.qrcode = item.wechat;
              this.alipayUrl = item.alipay;
            },
            confirmRenew: function() {
              if(this.isAlipay){
                  window.location.href = this.alipayUrl;
              }else{
                notification.alert("请确认微信扫码支付完成");
              }
            },
            initPaid: function(cur) {

              var _self = this;
              services.Common.list({
                param: {
                  status: 2,
                  cur: cur,
                  limit: 10,
                  creator: currentUser,
                },
                ctx: _self,
                url: 'orders'
              });

            },
            initUnPay:function (cur) {
              var _self = this;
              services.Common.list({
                param: {
                  status: 1,
                  cur: cur,
                  limit: 10,
                  creator: currentUser,
                },
                ctx: _self,
                all: 'all1',
                url: 'orders',
                target: 'fields_unpay',

                cb: function(res) {
                  var data =  res.data;
                  _self.fields_unpay = data.fields;
                  _self.ordersLoaded = true;
                }
              });
            }
        },
        events:{
          'weixin': function() {
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
