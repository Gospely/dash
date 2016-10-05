<template>
    <div class="container">
        <h1 class="title">创建容器</h1>
        <h2 class="subtitle">您可以在这里创建基于<strong>dodora容器云</strong>，并使用Gospel集成开发环境进行开发的应用</h2>
        <hr>
        <div class="content">

            <modal :is-html="true" :width="800" :is-show.sync="showImageSelectorForm">
                <div slot="header">选择镜像</div>
                <div slot="body">
                    <image-viewer></image-viewer>
                </div>
                <div slot="footer">
                </div>
            </modal>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">容器名称</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" placeholder="给您的容器取个名字吧">
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">容器配置</label>
              </div>
              <div class="control is-grouped">

                <div class="columns" style="margin-left: 82px;">

                    <div class="column is-2" v-for="(key, val) in dockerConfigs">
                        <div class="docker-config-box" v-bind:class="{'active': configIsActive[key].isActive}" @click="selectThisDockerConfig(val, key)">
                            <ul class="text-center parameter">
                                <li>{{val.memory}} 内存</li>
                                {{val.cpu}} CPU{{val.cpuType}}
                            </ul>
                            <div class="down-style">{{val.name}}</div>
                        </div>
                    </div>

                </div>

              </div>
            </div>

            <hr v-show="showCaculateResourceSlider">

            <div v-show="showCaculateResourceSlider" class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">使用时长</label>
              </div>
              <div class="control is-grouped" style="margin-left:30px">
                <div class="columns">
                    <div class="column">
                       <cyc></cyc>
                    </div>
                </div>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">容器镜像</label>
              </div>
              <div class="control is-grouped" style="margin-left:-20px">
                <p class="control is-expanded">
                    <a class="button is-primary" v-show="!withImage" @click="selectImage">选择镜像</a>
                    <span class="help" v-show="withImage">已选镜像：{{imageId}}</span>
                    <a style="margin-top:6px" class="button is-primary" v-show="withImage" @click="selectImage">重新选择</a>
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">用户名称</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" value="root" disabled>
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">用户密码</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="password">
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">状态服务</label>
              </div>
              <div class="control is-grouped" style="margin-left:13px">
                <p class="control is-expanded">
                    <input type="checkbox" v-model="isHaul">
                    有状态服务

                    <span class="help">Dodora容器云会帮您自动生成HTTP和SSH端口</span>
                </p>
              </div>
            </div>

            <hr v-show="isHaul">

            <div v-show="isHaul" class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">选择数据卷</label>
              </div>
              <div class="control is-grouped" style="margin-left:-33px">

                <div class="column" style="margin-left:0px">
                    <div class="docker-config-box active" style="width:auto" @click="selectThisDockerConfig(val, key)">
                        <ul class="text-center parameter">
                            <li><i style="font-size:20px" class="fa fa-database" aria-hidden="true"></i></li>
                        </ul>
                        <div class="down-style" style="padding-left:5px;padding-right:5px">Gospel_volume</div>
                    </div>
                </div>

              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">开始创建</label>
              </div>
              <div class="control is-grouped" style="margin-left:-20px">
                <p class="control is-expanded">
                    <button style="margin-top:6px" class="button is-primary" v-bind:class="{'is-loading': isCreateApp}" @click="createApp">立即创建</button>
                </p>
              </div>
            </div>

            <hr>

        </div>
    </div>
</template>
<style>
</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'
    import ImageViewer from './ImageViewer.vue'
    import Slider from 'vue-bulma-slider'
    import Cyc from '../../ui/Cyc.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {

                isCreateApp: false,

                withImage: false,
                imageId: null,

                showImageSelectorForm: false,

                showCaculateResourceSlider: false,

                configIsActive: [{
                    isActive: false
                }, {
                    isActive: true
                }, {
                    isActive: false
                }, {
                    isActive: false
                }, {
                    isActive: false
                }],

                currentActiveConfig: 1,

                dockerConfigs: [{
                    id: '1',
                    name: '1x',
                    memory: '256 MB',
                    cpu: '1',
                    cpuType: '(共享)',
                    free: true
                }, {
                    id: '2',
                    name: '2x',
                    memory: '512 MB',
                    cpu: '1',
                    cpuType: '(共享)',
                    free: true
                }, {
                    id: '3',
                    name: '4x',
                    memory: '1 GB',
                    cpu: '1',
                    cpuType: '(共享)',
                    free: true
                }, {
                    id: '4',
                    name: '8x',
                    memory: '2 GB',
                    cpu: '1',
                    cpuType: '',
                    free: false
                }, {
                    id: '5',
                    name: '16x',
                    memory: '4 GB',
                    cpu: '1',
                    cpuType: '',
                    free: false
                }],

                isHaul: false
            }
        },

        created () {

            if(typeof this.$route.params.imageId != 'undefined') {
                this.$set('withImage', true);
                this.$set('imageId', this.$route.params.imageId);
            }

        },

        components: {
            Modal,
            ImageViewer,
            Slider,
            Cyc
        },

        methods: {
            hideImageSelectorForm: function() {
                this.showImageSelectorForm = false;
            },

            selectImage: function() {
                this.showImageSelectorForm = true;
            },

            selectThisDockerConfig: function(dockerConfig, key) {

                this.showCaculateResourceSlider = !dockerConfig.free;

                this.configIsActive[key].isActive = true;
                if(key === this.currentActiveConfig) {
                    this.configIsActive[this.currentActiveConfig].isActive = true;
                }else {
                    this.configIsActive[this.currentActiveConfig].isActive = false;
                }
                this.currentActiveConfig = key;

            },

            createApp: function() {
                this.isCreateApp = true;
            },

            toggleVolumesList: function() {

            },
            initConfig: function() {

                var _self =  this;
                function callback(res){

                    console.log("callback");
                    var data = res.data;
                    var arr = new Array();

                    for(var i=0; i<data.fields.length; i++){
                      arr.push({
                          isActive: false
                      });
                    }
                    _self.dockerConfigs = data.fields;
                    _self.configIsActive = arr;
                }


                var options = {

                    ctx: _self,
                    url: "dockers_configs",
                    cb: callback
                }
                services.Common.list(options);
            }

        },
        ready: function() {
            this.$get('initConfig')();
        },
        events: {
            'imageOnSelected': function(id) {
                this.showImageSelectorForm = false;
                this.withImage = true;
                this.imageId = id;
            },

            'cycSelected': function(cyc) {
                console.log(cyc);
            }
        }

    }
</script>
