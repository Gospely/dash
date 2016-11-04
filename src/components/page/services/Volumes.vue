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
                                    <h3 class="title">存储详情</h3>
                                    <chart :type = "'pie'" :data = "chartData"></chart>
                                </div>
                            </div>
                        </div>
                    </section>
                </tab-item>
                <tab-item @selected="openVolumeRenewingModal" title="升降级">
                </tab-item>
            </tab>

            <modal :is-html="true" :is-show.sync="renewIDEVolumeForm">
                <div slot="header">升降级数据卷</div>
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

            renewIDEVolumeForm: false
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

        initVolume: function(cur) {

            var _self = this;

            services.Common.list(
              {
                url: "volumes",
                ctx: _self,
                param: {
                  cur: cur,
                  limit: 1,
                  creator: "1"
                }
              }
            );
        }
      },
      ready: function() {
          this.$get("initVolume")(1);
      }
    }
</script>
