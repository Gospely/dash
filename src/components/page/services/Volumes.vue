<template>
    <div class="container">
        <h1 class="title">数据卷服务</h1>
        <h2 class="subtitle">数据卷服务是<strong>dodora容器云</strong>持久化数据、共享数据的存储空间</h2>
        <hr>
        <div class="content">

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="基本信息">
                    <section class="section">
                        <div class="columns">
                            <div class="column is-half">
                                <div class="box">
                                    <h3 class="title">免费存储</h3>
                                    <chart :type = "'pie'" :data = "chartData"></chart>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="box">
                                    <h3 class="title">收费存储</h3>
                                    <chart :type = "'pie'" :data = "chartData"></chart>
                                </div>
                            </div>
                        </div>
                    </section>
                </tab-item>
                <tab-item @selected="openVolumeRenewingModal" title="扩容">
                </tab-item>
            </tab>

            <modal :is-html="true" :is-show.sync="renewIDEVolumeForm">
                <div slot="header">数据卷扩容</div>
                <div slot="body">

                    <div v-show="changeSize">
                      <div class="column is-8">
                          <label class="label">原数据卷大小： {{volume.min}}</label>
                      </div>
                      <div class="control is-horizontal user-center">
                        <div class="control-label">
                          <label class="label">数据卷大小</label>
                        </div>
                        <div class="control is-grouped" style="margin-left:16px">
                          <div class="columns">

                              <div class="column is-8">
                                  <input v-model="volume.size" value="20" min="{{volume.min}}" max="{{volume.max}}" step="{{volume.step}}" class="slider" type="range" style="margin-top:10px;">
                              </div>
                              <div class="column is-4">
                                  <span class="help is-tip" style="margin: 8px;">{{volume.size}} G</span>
                              </div>
                          </div>
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

                    <div v-show="goPay">

                      <div>
                          <span>合计：</span>
                          <span>{{price }} 元</span>
                      </div>

                      <hr class="split">

                      <div class="control is-horizontal user-center">
                        <div class="control-label">
                          <label class="label">支付方式</label>
                        </div>
                      </div>

                      <pay-method :val.sync="qrcode"></pay-method>
                    </div>

                </div>
                <div slot="footer">
                    <button class="button is-success" v-show="changeSize" @click="nextStep">确认下单</button>

                    <button class="button is-success" v-show="goPay" @click="prvStep">上一步</button>

                    <button class="button is-success" v-show="goPay && isAlipay"
                        @click="confirmRenewIDEVolume">
                    确定支付
                    </button>

                    <button class="button" @click="renewIDEVolumeForm = false">取消</button>
                </div>
            </modal>

        </div>
    </div>
</template>
<style>
</style>
<script>
    import Chart from '../../ui/Chart.vue'
    import {Tab, TabItem} from '../../ui/Tab'
    import Page from '../../ui/Page/Page.vue'

    import Cyc from '../../ui/Cyc.vue'
    import Modal from '../../ui/Modal/Modal.vue'
    import PayMethod from '../../ui/PayMethod.vue'
    import uuid from 'node-uuid'
    import _md5 from 'md5'

    export default{
      computed: {
          chartData () {
              var self = this;
              return {
                  labels: [
                    '已使用',
                    '未使用',
                  ],
                  datasets: [{
                      data: self.data,
                      backgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                      ]
                  }]
              }
          }
      },
      created () {

      },
      beforeDestroy () {
          if (this.timer) {
              clearInterval(this.timer)
          }
      },
      data () {
          return {
            data: [300, 200],

            isRefresh: false,
            fields: [],
            all: 8,
            cur: 1,
            qrcode: '',
            volume: {
              size: 10,
              min: 10,
              max: 100,
              step: 10
            },
            orderNo: '',
            price: '',
            unitPrice: '',
            products: '',
            renewIDEVolumeForm: false,

            changeSize: true,
            goPay: false,
            isWechat: false,
            isAlipay: true
          }
      },
      components: {
          Chart,
          Tab,
          TabItem,
          Page,
          Cyc,
          Modal,
          PayMethod
      },

      methods: {

        listen: function(data) {
          console.log('你点击了'+data+ '页');
          this.$get('initVolume')(data);
        },

        refreshAppList: function() {
          this.isRefresh = true;
        },

        openVolumeRenewingModal: function() {
          this.renewIDEVolumeForm = true;
        },

        init: function() {
            var _self = this;
            //获取用户当前数据卷大小
            services.Common.getOne({
              url: 'users',
              param: {
                id: currentUser
              },
              cb: function(res) {
                var data = res.data;
                console.log(res);
                if(data.code == 1) {
                  _self.volume.size = data.fields.volumeSize;
                  _self.volume.min = data.fields.volumeSize;
                  if(data.fields.volumeSize>100) {
                    _self.volume.max = 1000;
                    _self.volume.step = 100;
                  }else{
                    _self.volume.max = 100;
                    _self.volume.step = 10;
                  }
                }
              }
            });
            //获取数据卷的价格
            services.Common.list({
              url: 'products',
              param: {
                type: 'volume'
              },
              cb: function(res) {
                  var data =  res.data;
                  if(data.code == 1) {
                    console.log(data);
                    _self.unitPrice =  data.fields[0].price;
                    _self.products = data.fields[0].id;
                  }
              }
            });
        },
        nextStep() {
          this.changeSize = false;
          this.goPay = true;
          this.orderNo =  _md5(uuid.v4());
          console.log(this.orderNo);
          var _self = this;
          services.Common.create({
            url: 'orders',
            param: {
              creator: currentUser,
              name: '数据卷扩容',
              orderNo: this.orderNo,
              size: this.volume.size - this.volume.min,
              unit: "GB",
              price: (this.volume.size - this.volume.min) * this.unitPrice,
              unitPrice: this.unitPrice
            },
            cb: function(res) {
              if(res.data.code == 1) {
                notification.alert("下单成功");

                services.OrderService.order({

                  out_trade_no: _self.orderNo,
                  price: (_self.volume.size - _self.volume.min) * _self.unitPrice,
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


        },
        prvStep() {
          this.goPay = false;
          this.changeSize = true;
        },
        valueChange() {
          console.log(this.volume.size);
        },
        confirmRenewIDEVolume() {
          if(this.isAlipay){
            services.OrderService.order({
              out_trade_no: this.orderNo,
              price: (this.volume.size - this.volume.min) * this.unitPrice,
              type: "alipay"
            }).then(function(res){
                console.log(res);
                window.location.href = res.body;
            },function(err,res){

            });
          }else{
            notification.alert("请确认微信扫码支付完成");
          }
        }
      },
      ready: function() {
          this.$get("init")();
      },
      events: {
        'weixin': function() {
           console.log("wechat");
           this.isWechat = true;
           this.isAlipay = false;
         },
         'alipay': function() {
           this.isWechat = false;
           this.isAlipay = true;
         }
      },
      watch:{
        'volume.size': function(newVal, oldVal) {

            var total = (newVal - this.volume.min) * this.unitPrice;
            this.price = (newVal - this.volume.min) +" X " +  this.unitPrice + "GB = " + total;
        }
      }
    }
</script>
