<template>
    <div class="container">
        <h1 class="title">管理您的Gospel集成开发环境</h1>
        <h2 class="subtitle">在这里您可以管理您的<strong>Gospel集成开发环境</strong></h2>
        <hr>
        <div class="content">

            <a class="button is-primary" v-bind:class="{'is-loading': isRefresh}" @click="refreshIDEState">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </a>

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="我的IDE">
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
                <tab-item title="磁盘管理">
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
            </tab>

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

                qrcode: 'http://www.baidu.com'
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
            refreshIDEState: function() {
                this.isRefresh = true;
            },
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
