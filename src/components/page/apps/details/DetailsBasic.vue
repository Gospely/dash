<template>
    <div class="container">
        <div class="basic-wrapper">

            <div class="columns">

                <div class="column is-three-quarters">

                    <div class="columns">
                        <div class="column is-half">

                            <h4><button class="button is-small" v-bind:class="{'is-success': !status_running, 'is-danger': !status_stop}">{{status}}</button> {{inspectInfo.name}}</h4>
                            <h4 class="subtitle">运行于：{{inspectInfo.createat}}</h4>

                            <button class="button is-primary" v-bind:class="{'is-loading': isLoading}" v-on:click="start" v-show="status_running">运行</button>
                            <button class="button is-warning" v-bind:class="{'is-loading': isLoading}" v-on:click="stop" v-show="status_stop">停止</button>
                            <button class="button is-success" v-bind:class="{'is-loading': isLoading}" v-on:click="restart">重新启动</button>
                            <button class="button is-primary" v-bind:class="{'is-loading': isLoading}" v-on:click="openInIde">从IDE打开</button>
                        </div>

                        <div class="column is-half">

                            <span class="help is-tip">状态: <span style="display:inline" class="help is-success">{{inspectInfo.status | dockerStatus}}</span></span>
                            <span class="help is-tip">访问方式: HTTP/SSH, HTTP端口：{{inspectInfo.port}}, SSH端口：{{inspectInfo.sshPort}}</span>
                            <span class="help is-tip">运行环境: Dodora云平台</span>
                            <span class="help is-tip">运行系统: Linux Ubuntu</span>
                            <span class="help is-tip">数据库用户名: {{inspectInfo.dbUser | appDBInfo}}</span>
                            <span class="help is-tip">数据库表: {{inspectInfo.dbUser | appDBInfo}}</span>
                            <span class="help is-tip">访问地址: <a style="margin-top: -30px;margin-left: -187px;" target="__blank" href="http://gospely.com:{{inspectInfo.port}}">http://gospely.com:{{inspectInfo.port}}</a></span>

                        </div>
                    </div>

                </div>

                <div class="column">
                  <div v-show="inspectInfo.team">
                    <h4>团队成员</h4>

                    <article class="media">
                      <figure class="media-left">
                        <p class="image is-64x64">
                          <img src="https://avatars0.githubusercontent.com/u/2469688?v=3&s=80">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>ivy</strong>
                            <br>
                            <small>@ivydom</small>
                          </p>
                        </div>
                      </div>
                    </article>

                    <article class="media">
                      <figure class="media-left">
                        <p class="image is-64x64">
                          <img src="https://avatars3.githubusercontent.com/u/8946077?v=3&s=80">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>SharksevenRo</strong>
                            <br>
                            <small>@SharksevenRo</small>
                          </p>
                        </div>
                      </div>
                    </article>

                    <article class="media">
                      <figure class="media-left">
                        <p class="image is-64x64">
                          <img src="https://avatars2.githubusercontent.com/u/22238105?v=3&s=80">
                        </p>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>shiPengtao</strong>
                            <br>
                            <small>@shiPengtao</small>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>

                  <span  v-show="!inspectInfo.team" class="help is-tip">此项目非团队项目</span>

                </div>

            </div>

        </div>
    </div>
</template>
<style>

    h4.subtitle {
        font-size: 17px;
        color: #777;
    }

    .is-tip {
        color: #777;
    }

</style>
<script>
    import Vue from 'vue'
    import Modal from '../../../ui/Modal/Modal.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
              baseFields: [],
              appId: "",
              showDomainAddingForm: false,
              isEditDomain: false,
              domainInfoFormName: '绑定域名',
              fields: '',

              inspectInfo: {},
              status: '',
              status_stop: false,
              status_running: false,
              isLoading: false
            }
        },

        components: {
            Chart,
            Modal
        },

        ready (){
          this.$set("appId", this.$route.query.containerId);
          this.$get('inspect')();
        },

        methods: {
          start: function(){
            var self = this;
            notification.alert('正在启动...');
            var option = {
              param: {
                containerName: self.appId,
              },
              cb: function(res) {
                if(res.status == 200){
                    notification.alert(res.data.message);
                    reload: self.$get("inspect")()
                }else {
                  notification.alert(res.body);
                }
                self.isLoading = false;
              },
              url: "container/start",
              target: self.baseFields
            };
            this.isLoading = true;
            services.Common.containerOperate(option)
          },

          openInIde: function(){
            window.open(location.origin + "/#/project/" + this.appId +"?from=dash");
          },

          inspect: function() {
            var self = this;
            var option = {
              param: {
                id: self.appId,
              },
              cb: function(res) {
                self.isLoading = false;
                if(res.status == 200){

                  var data = res.data;
                  if(data.code == 1){

                    self.inspectInfo = data.fields;

                    if(data.fields.status == 1){
                        self.status = '已启动';
                        self.status_stop = true;
                        self.status_running = false;
                    }
                    if(data.fields.status == -1 ){
                        self.status_running = true;
                        self.status_stop = false;
                        self.status = '未运行';
                    }
                  }
                }
              },
              url: "applications",
            };
            this.isLoading = true;
            services.Common.getOne(option);
          },

          stop: function(){

            var self = this;

            new ModalCtrl({
                el: document.createElement('div'),
                props: {
                    isShow: false,
                    header: {
                        default: '停止应用'
                    },
                    body: {
                        default: '您确定要停止此应用吗？'
                    }
                },
                events: {
                    'confirmed': function() {
                      notification.alert('正在停止...');
                      var option = {
                        param: {
                          containerName: self.appId,
                        },
                        cb: function(res) {
                            if(res.status == 200){
                                notification.alert(res.data.message);
                                self.$get("inspect")();
                            }
                            self.isLoading = false;
                        },
                        url: "container/stop",
                        target: self.baseFields,
                      };
                      self.isLoading = true;
                      services.Common.containerOperate(option);
                      this.$destroy(true);
                    }
                }
            }).show();
          },

          restart: function(){

            var self = this;
            new ModalCtrl({
                el: document.createElement('div'),
                props: {
                    isShow: false,
                    header: {
                        default: '停止应用'
                    },
                    body: {
                        default: '您确定要停止此应用吗？'
                    }
                },
                events: {
                  'confirmed': function() {
                      notification.alert('正在重启...');
                      var option = {
                        param: {
                          containerName: self.appId,
                        },
                        cb: function(res) {
                            if(res.status == 200){
                                notification.alert(res.data.message);
                                self.$get("inspect")();
                            }
                            self.isLoading = false;
                        },
                        url: "container/restart",
                        target: self.baseFields,
                      }
                      self.isLoading = true;
                      services.Common.containerOperate(option);
                      this.$destroy(true);
                  }
                }
            }).show();

          }
        }
    }
</script>
