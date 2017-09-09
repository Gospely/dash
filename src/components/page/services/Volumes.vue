<template>
    <div class="container">
        <h1 class="title">数据卷服务</h1>
        <h2 class="subtitle">数据卷服务是持久化容器数据的存储空间</h2>
        <hr>
        <loading v-show="!storageLoaded"></loading>
        <div class="content" v-show="storageLoaded">

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="基本信息">
                    <section class="section">
                        <div class="columns">
                            <div class="column is-half">
                                <div class="box">
                                    <h3 class="title">免费存储</h3>
                                    <div>
                                      <chart type = "pie" :data = "chartData"></chart>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="box">
                                    <h3 class="title">收费存储</h3>
                                    <div v-if="chartData.chargeMemory">
                                      <chart type = "pie" :data = "chartData"></chart>
                                    </div>
                                    <div v-else>
                                        您还未购买数据卷
                                    </div>
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
        var _self =  this;
        var used = 100;
        var rest = 100;
        services.VolumeService.info({
          user: currentUser
        }).then(function(res){
          ;
          var data = res.data.fields;
          used = parseInt(data.used)/1024;
          rest = parseInt(data.size) - used;
        },function(err){

        });
        　setTimeout(function () {
          ;
          _self.data.$set(0,used.toFixed(2));
          _self.data.$set(1,rest.toFixed(2));
        }, 2000)
      },
      beforeDestroy () {
          if (this.timer) {
              clearInterval(this.timer)
          }
      },
      data () {
          return {
            data: [300, 300],

            isRefresh: false,
            fields: [],
            all: 8,
            cur: 1,
            qrcode: '',
            alipayUrl: '',
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
            isAlipay: true,

            storageLoaded: false
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
                ;
                if(data.code == 1) {
                  _self.volume.size = data.fields.volumeSize;
                  _self.volume.min = data.fields.volumeSize;
                  if(data.fields.volumeSize>100) {
                    _self.volume.max = 1000;
                    _self.volume.step = 1;
                  }else{
                    _self.volume.max = 100;
                    _self.volume.step = 1;
                  }
                  _self.storageLoaded = true;
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
              unitPrice: this.unitPrice,
              type: 'volume'
            },
            cb: function(res) {
              if(res.data.code == 1) {
                notification.alert("下单成功");
                _self.qrcode = res.data.fields.wechat;
                _self.alipayUrl = res.data.fields.alipay;
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
              window.location.href = this.alipayUrl;
          }else{
            notification.alert("请确认微信扫码支付完成");
          }
        },
        initVolume: function() {


        }
      },
      ready: function() {
          this.$get("init")();

      },
      events: {
        'weixin': function() {
           console.log("wechat");
           if(!window.timerId){
               window.timerId = window.setInterval(function(){
                   console.log("check");
                   services.Common.list({
                       url: 'orders',
                       param: {
                           orderNo:  localStorage.orderNo,
                           status: 2
                       },
                       cb: function(res){
                           if(res.data.fields.length == 1){
                               window.clearInterval(window.timerId);
                               window.timerId = null;
                               notification.alert("支付成功");
                               window.location.href = window.location.origin + '/#!/accounts/orders?code=pay'
                           }
                       }
                   });
               },1000);
           }
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
