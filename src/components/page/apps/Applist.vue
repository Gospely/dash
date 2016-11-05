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
                            <a  v-link="{path: '/apps/detail/'+item.id}">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur" :all.sync="all" v-on:btn-click="listen"></page>
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
                            <a v-link="{path: '/apps/detail/'+item.id}">
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

    export default{
        data () {
            return {
                isRefresh: false,
                fields: [],
                fields_stop: [],
                fields_unBind: [],
                cur: 1,
                all: 8,
                cur_stop: 1,
                all_stop: 8,
                all_unBind: 8,
                cur_unBind: 1,
            }
        },

        components: {
            Tab,
            TabItem,
            Page
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

            refreshAppList: function() {
                this.isRefresh = true;
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
                  ctx: _self
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
                  ctx: _self
                }

                services.Common.list(options);
            }
        },
        ready: function() {

            this.$get("init")(1);
            this.$get("initStop")(1);
        }
    }
</script>
