<template>
    <div class="container">
        <h1 class="title">数据卷服务</h1>
        <h2 class="subtitle">数据卷服务是<strong>dodora容器云</strong>持久化数据、共享数据的存储空间</h2>
        <hr>
        <div class="content">

            <!-- <a v-link="{name:'newvolumes'}" class="button is-primary">
              创建数据卷
            </a>

            <a class="button is-primary" v-bind:class="{'is-loading': isRefresh}" @click="refreshAppList">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </a> -->

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="基本型数据卷">
                    <!-- <table class="table">
                      <thead>
                        <tr>
                          <th>名称</th>
                          <th>配置</th>
                          <th>容量</th>
                          <th>剩余</th>
                          <th>操作</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table> -->
                    <section class="section">
                        <div class="columns">
                            <div class="column is-half">
                                <div class="box">
                                    <h3 class="title">已使用</h3>
                                    <chart :type = "'pie'" :data = "chartData"></chart>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="box">
                                    <h3 class="title">全部数据卷</h3>
                                    <chart :type = "'pie'" :data = "dynamicChartData"></chart>
                                </div>
                            </div>
                        </div>
                    </section>
                </tab-item>
                <tab-item title="拓展型数据卷">
                    <!-- <table class="table">
                      <thead>
                        <tr>
                          <th>名称</th>
                          <th>配置</th>
                          <th>容量</th>
                          <th>剩余</th>
                          <th>操作</th>
                          <th></th>
                        </tr>
                      </thead>
                        <tbody></tbody>
                    </table> -->
                    <section class="section">
                        <div class="columns">
                            <div class="column is-half">
                                <div class="box">
                                    <h3 class="title">全部数据卷</h3>
                                    <chart :type = "'pie'" :data = "chartData"></chart>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="box">
                                    <h3 class="title">已使用</h3>
                                    <chart :type = "'pie'" :data = "dynamicChartData"></chart>
                                </div>
                            </div>
                        </div>
                    </section>
                </tab-item>
            </tab>

        </div>
    </div>
</template>
<style>
</style>
<script>
    import Chart from '../../ui/Chart.vue'
    import {Tab, TabItem} from '../../ui/Tab'
    import Page from '../../ui/Page/Page.vue'

    export default{
      computed: {
          chartData () {
              return {
                  labels: [
                    '已使用',
                    '未使用',
                  ],
                  datasets: [{
                      data: this.data,
                      backgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                      ]
                  }]
              }
          },
          dynamicChartData () {
              return {
                  labels: [
                      'Red',
                      'Blue',
                      'Yellow'
                  ],
                  datasets: [{
                      data: this.dynamicData,
                      backgroundColor: [
                          '#FF6384',
                          '#36A2EB',
                          '#FFCE56'
                      ]
                  }]
              }
          }
      },
      created () {
          var self = this
          this.timer = setInterval(function () {
              self.dynamicData.forEach(function (item, i) {
                  self.dynamicData.$set(i, Math.ceil(Math.random() * 1000))
              })
          }, 1024)
      },
      beforeDestroy () {
          if (this.timer) {
              clearInterval(this.timer)
          }
      },
        data () {
            return {
              data: [ 300, 200],
              dynamicData: [200, 300, 400],
                isRefresh: false,
                fields: [],
                all: 8,
                cur: 1,
            }
        },
        components: {
            Chart,
            Tab,
            TabItem,
            Page
        },

        methods: {

          listen: function(data) {
            console.log('你点击了'+data+ '页');
            this.$get('initVolume')(data);
          },
            refreshAppList: function() {
                this.isRefresh = true;
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
