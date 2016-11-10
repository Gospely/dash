<template>
    <div class="container">
        <h1 class="title">应用列表</h1>
        <h2 class="subtitle">这里有您在<strong>dodora容器云</strong>上部署的所有应用</h2>
        <hr>
        <div class="content">

            <a class="button is-primary" v-link="{path: '/apps/new'}">创建应用</a>

            <a class="button is-primary" v-bind:class="{'is-loading': isRefresh}" @click="refreshAppList">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </a>

            <modal :is-html="true" :width="800" :is-show.sync="showPayForm">
                <div slot="header">您正在对应用 {{description}} 进行付款操作</div>
                <div slot="body">

                    <div class="columns">
                        <div class="column">
                            <pay-method :val.sync="qrcode"></pay-method>
                        </div>
                    </div>

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
                        @click="confirmToPay">
                    确定支付
                    </button>
                    <button class="button" @click="showPayForm = false">取消</button>
                </div>
            </modal>

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="运行中">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>镜像(运行环境)</th>
                          <th>状态</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields">
                          <td>{{item.name}}</td>
                          <td>{{item.image}}</td>
                          <td>
                            运行中
                          </td>
                          <td class="is-icon" title="进入应用">
                            <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur" :all.sync="all" v-on:btn-click="listen"></page>
                </tab-item>
                <tab-item title="未支付">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>镜像(运行环境)</th>
                          <th>状态</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_notpaid">
                            <td>{{item.name}}</td>
                            <td>{{item.image}}</td>
                          <td>
                            未支付
                          </td>
                          <td class="is-icon" title="进入应用">
                            <a @click="payForApp(item)">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur_stop" :all.sync="all_stop" v-on:btn-click="listen_stop"></page>
                </tab-item>
                <tab-item title="已停止">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>镜像(运行环境)</th>
                          <th>状态</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in fields_stop">
                            <td>{{item.name}}</td>
                            <td>{{item.image}}</td>
                          <td>
                            已停止
                          </td>
                          <td class="is-icon" title="进入应用">
                            <a v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur_stop" :all.sync="all_stop" v-on:btn-click="listen_stop"></page>
                </tab-item>
            </tab>
        </div>
    </div>
</template>
<style>

</style>
<script>

    import {Tab, TabItem} from '../../ui/Tab'
    import Page from '../../ui/Page/Page.vue'
    import Modal from '../../ui/Modal/Modal.vue'

    import PayMethod from '../../ui/PayMethod.vue';

    export default{
        data () {
            return {
                isRefresh: false,
                currentIndex:0,
                fields: [],
                fields_stop: [],
                fields_notpaid: [],
                cur: 1,
                all: 8,
                cur_stop: 1,
                all_stop: 8,
                all_notpaid: 8,
                cur_notpaid: 1,

                showPayForm: false,
                qrcode: '',
                description: '',
                price: '',
                isWechat: false,
                isAlipay: true
            }
        },

        components: {
            Tab,
            TabItem,
            Page,
            Modal,
            PayMethod
        },

        methods: {

            listen: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('init')(data);
            },

            listen_stop: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initStop')(data);
            },

            listen_unBind: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initUnBind')(data);
            },

            stopThisAPP: function() {

            },

            confirmToPay: function() {

              console.log(this.isAlipay);
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
              this.showPayForm = false;
            },

            refreshAppList: function() {
                this.isRefresh = true;
                if (this.currentIndex == 0) {
                  this.$get("init")(1);
                }else{
                  this.$get("initStop")(1);
                }
            },

            init: function(cur) {

                var _self = this;
                var options = {
                  param: {
                    limit: 10,
                    cur: cur,
                    status: 1,
                    creator: currentUser
                  },
                  url: "applications",
                  ctx: _self,
                  reload:function () {
                    if (_self.isRefresh) {
                      notification.alert("刷新成功");
                    }
                    _self.isRefresh = false;
                  }
                }

                services.Common.list(options);
            },
            initNotpaid: function(cur) {

                var _self = this;
                var options = {

                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    pay_status: -1,
                    creator: currentUser
                  },
                  target: 'fields_notpaid',
                  all: 'all_notpaid',
                  ctx: _self,
                  reload:function () {
                    if (_self.isRefresh) {
                      notification.alert("刷新成功");
                    }
                    _self.isRefresh = false;
                  }
                }

                services.Common.list(options);
            },
            initStop: function(cur) {

                var _self = this;
                var options = {

                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    status: -1,
                    creator: currentUser
                  },
                  target: 'fields_stop',
                  all: 'all_stop',
                  ctx: _self,
                  reload:function () {
                    if (_self.isRefresh) {
                      notification.alert("刷新成功");
                    }
                    _self.isRefresh = false;
                  }
                }

                services.Common.list(options);
            },

            payForApp: function(item) {

              var _self = this;
              services.Common.getOne({
                url: 'orders',
                param: {
                  id: item.orderNo
                },
                cb: function(res) {

                  var data = res.data;
                  if(data.code == 1) {

                    _self.description = data.fields.name;
                    _self.price =  data.fields.price;
                    _self.showPayForm = true;
                    services.OrderService.order({

                      out_trade_no: data.fields.orderNo,
                      price: data.fields.price,
                      type: 'wechat'
                    }).then(function(res){
                        console.log(res);
                        _self.qrcode = res.data.code_url;
                        //window.location.href = res.body;
                    },function(err,res){

                    });
                  }
                }
              });

            }
        },
        ready: function() {

            this.$get("init")(1);
            this.$get("initStop")(1);
            this.$get("initNotpaid")(1);
        },
        events:{
          'selected':function (index) {
            this.currentIndex = index;
          },
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
