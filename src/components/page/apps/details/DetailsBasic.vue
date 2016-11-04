<template>
    <div class="container">
        <div class="basic-wrapper">

            <div class="columns">

                <div class="column is-three-quarters">

                    <div class="columns">
                        <div class="column is-half">

                            <h4>{{inspectInfo.name}}</h4>
                            <h4 class="subtitle">部署于：{{inspectInfo.createat}}</h4>

                            <button class="button is-primary" v-on:click="start">启动</button>
                            <button class="button is-warning" v-on:click="stop">停止</button>
                            <button class="button is-success" v-on:click="restart">重新启动</button>
                            <button class="button is-primary" v-on:click="openInIde">从IDE打开</button>
                        </div>

                        <div class="column is-half">

                            <span class="help is-tip">状态: <span style="display:inline" class="help is-success">正在运行</span></span>
                            <span class="help is-tip">访问方式: HTTP/SSH, HTTP端口：{{inspectInfo.port}}, SSH端口：{{inspectInfo.sshPort}}</span>
                            <span class="help is-tip">运行环境: Dodora云平台</span>
                            <span class="help is-tip">运行系统: Linux Ubuntu</span>
                            <span class="help is-tip">访问地址: {{inspectInfo.domain}}</span>

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

              inspectInfo: {}
            }
        },

        components: {
            Chart,
            Modal
        },

        ready (){
          this.$set("appId", this.$route.params.containerId);
          console.log(this.$get("appId"));
          this.$get('inspect')();
        },

        methods: {
          start: function(){
            var self = this;
            var option = {
              param: {
                containerName: self.appId,
              },
              msg: {
                success: {
                  title: '删除容器镜像',
                  message: '删除容器镜像成功',
                  type: 'primary',
                },
                failed: {
                  title: '删除容器镜像',
                  message: '删除容器镜像失败',
                  type: 'warning',
                }
              },
              cb: function(res) {
                  if(res.status == 200){
                      notification.alert(data.message);
                  }
              },
              url: "container/start",
              target: self.baseFields,
            };
            services.Common.containerOperate(option).then(function(res){
              notification.alert(res.status);
            })
          },

          openInIde: function(){
            window.location.href = "http://ide.gospely.com/#!/archive/" + this.appId;
          },

          inspect: function() {
            var self = this;
            var option = {
              param: {
                containerName: self.appId,
              },
              cb: function(res) {

                if(res.data.code == 500) {
                  notification.alert(res.data.message, 'warning');
                }else {
                  self.inspectInfo = res.data.fields;
                }
              },
              url: "container/inspect",
              target: self.inspectInfo,
            };
            services.Common.containerOperate(option);
          },

          stop: function(){
            var self = this;
            var option = {
              param: {
                containerName: self.appId,
              },
              cb: function(res) {
                  if(res.status == 200){
                      notification.alert(data.message);
                  }
              },
              url: "container/stop",
             target: self.baseFields,
            };
            services.Common.containerOperate(option);
          },

          restart: function(){
            var self = this;
            var option = {
              param: {
                containerName: self.appId,
              },
              cb: function(res) {
                  if(res.status == 200){
                      notification.alert(data.message);
                  }
              },
              url: "container/restart",
              target: self.baseFields,
            };
            services.Common.containerOperate(option);
          },

          saveChanges: function() {

          }

        }
    }
</script>
