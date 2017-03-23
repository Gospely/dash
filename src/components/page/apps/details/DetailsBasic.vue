<template>
    <div class="container">
        <div class="basic-wrapper">

            <div class="columns">

                <div class="column is-three-quarters">

                    <div class="columns">
                        <div class="column is-half">

                            <h4>
                              <button class="button is-small" v-bind:class="{'is-success': !status_running, 'is-danger': !status_stop}">{{status}}</button>
                              {{inspectInfo.name}}
                              <a style="float:right;margin-left: -80px;" target="__blank" href="http://{{inspectInfo.domain}}.gospely.com">访问<i class="fa fa-hand-pointer-o" aria-hidden="true"></i></a>
                            </h4>

                            <h4 class="subtitle">运行于：{{inspectInfo.createat | dateFormat 'yyyy-MM-dd hh:mm:ss'}}</h4>

                            <button class="button is-primary" v-bind:class="{'is-loading': isLoading}" v-on:click="start" v-show="status_running">运行</button>
                            <button class="button is-warning" v-bind:class="{'is-loading': isLoading}" v-on:click="stop" v-show="status_stop">停止</button>
                            <button class="button is-success" v-bind:class="{'is-loading': isLoading}" v-on:click="restart">重新启动</button>
                            <button class="button is-primary" v-bind:class="{'is-loading': isLoading}" v-on:click="openInIde">从IDE打开</button>
                            <button class="button is-warning" v-bind:class="{'is-loading': isLoading}" v-on:click="askIfRemove">删除</button>
                        </div>

                        <div class="column is-half">

                            <span class="help is-tip">状态: <span style="display:inline" class="help is-success">{{inspectInfo.status | dockerStatus}}</span></span>
                            <span class="help is-tip">访问方式: HTTP/SSH, HTTP端口：{{inspectInfo.port}}, SSH端口：{{inspectInfo.sshPort}}</span>
                            <span class="help is-tip">运行环境: Gospel 容器云</span>
                            <span class="help is-tip">运行系统: Linux Ubuntu</span>
                            <span class="help is-tip">数据库用户名: {{inspectInfo.dbUser | appDBInfo}}</span>
                            <span class="help is-tip">数据库表: {{inspectInfo.dbUser | appDBInfo}}</span>
                            <span class="help is-tip">访问地址: <span @click="visitThis" class="link">http://{{inspectInfo.domain}}.gospely.com</span></span>

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
    <modal :is-html="true" :width="400" :is-show.sync="showDeleteModal">

        <div slot="header">删除应用</div>
        <div slot="body">
            <loading v-show="isDeleting"></loading>
            <p class="control" v-show="!isDeleting">
                <input class="input custom-input" type="password" v-model="password" placeholder="输入密码">
            </p>
        </div>
        <div slot="footer">
             <button class="button is-primary" @click="confirmDelete">
                确定
            </button>
            <button class="button" @click="concelDelete">
               取消
           </button>
        </div>
    </modal>

</template>
<style>

    h4.subtitle {
      font-size: 17px;
      color: #777;
    }

    .is-tip {
      color: #777;
    }

    .link {
      color: #8d85be;
      cursor: pointer;
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
              isLoading: false,
              showDeleteModal: false,
              password: '',
              isDeleting: false,
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
            confirmDelete: function(){

                var _self = this;
                if(_self.password == ''){
                    console.log('sdasdsaadsa');
                    notification.alert('请输入密码');
                    return;
                }
                notification.alert('正在删除...请稍候...');

                var options = {
                    param: {
                        id: _self.appId + '@' + _self.password + '@' + localStorage.user,
                    },
                    url: 'applications',
                    target: 'result',
                    cb: function(res) {

                        if(res.data.code == 1){
                            notification.alert('删除成功...');
                            _self.$router.go('/apps/list');
                            _self.$destroy(true);
                        }else {
                            _self.isDeleting = false;
                            notification.alert(res.data.message, 'danger');
                        }
                    },
                    ctx: _self
                }
                _self.isDeleting = true;
                services.Common.delete(options);
                _self.password = '';
            },
            concelDelete: function() {
                this.showDeleteModal = false;
            },
            askIfRemove: function() {
                console.log('askIfRemove');
                this.showDeleteModal = true;
            },
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

          visitThis: function() {
            var url = "http://" + this.inspectInfo.domain + ".gospely.com";
            window.open(url);
          },

          openInIde: function(){

            if (window.parent !== window) {
              parent.postMessage({
                    openApp: this.inspectInfo
              }, '*');
              return false;
            }
            if(document.domain == 'localhost') {
              window.open('http://localhost:8989' + "/#/project/" + this.appId +"?from=dash");
            }else {
              window.open('http://ide.gospely.com' + "/#/project/" + this.appId +"?from=dash");
            }
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
                        default: '您确定要重新启动此应用吗？（应用将先停止）'
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
