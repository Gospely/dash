<template>
    <div class="container">
        <div class="basic-wrapper">
            
            <div class="columns">
                
                <div class="column is-three-quarters">

                    <div class="columns">
                        <div class="column is-half">
                            
                            <h4>Gospel_docker</h4>
                            <h4 class="subtitle">部署于：24小时前</h4>

                            <button class="button is-primary">启动</button>
                            <button class="button is-warning">停止</button>
                            <button class="button is-success">重新启动</button>
                            <button class="button is-primary">从IDE打开</button>
                        </div>

                        <div class="column is-half">
                            
                            <span class="help is-tip">状态: <span style="display:inline" class="help is-success">正在运行</span></span>
                            <span class="help is-tip">访问方式: HTTP/SSH, HTTP端口：8889, SSH端口：8876</span>
                            <span class="help is-tip">运行环境: Dodora云平台</span>
                            <span class="help is-tip">运行系统: Linux Ubuntu</span>
                            <span class="help is-tip">访问地址: http://gospel-docker.gospely.com</span>

                        </div>
                    </div>

                </div>

                <div class="column">
                    
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

                    <span class="help is-tip">此项目非团队项目</span>

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
                showDomainAddingForm: false,
                isEditDomain: false,
                domainInfoFormName: '绑定域名'
            }
        },

        components: {
            Chart,
            Modal
        },

        methods: {

            saveChanges: function() {

            }

        }
    }
</script>
