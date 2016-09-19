<template>
    <div class="container">
        <h1 class="title">创建应用</h1>
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

            <div class="columns">
                
                <div class="column is-three-quarters">
                    
                    <label class="label">应用名称</label>
                    <p class="control">
                        <input class="input" type="text" placeholder="给您的应用取个名字吧">
                    </p>
                    <label class="label">容器配置</label>
                    <p class="control">
                        <div class="columns">
                            
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
                    </p>
                    <label class="label">容器镜像</label>
                    <p class="control">
                        <a class="button is-primary" @click="selectImage">选择镜像</a>
                    </p>
                    <label class="label">用户名</label>
                    <p class="control">
                        <input class="input" type="text" value="root" disabled>
                    </p>
                    <label class="label">密码</label>
                    <p class="control">
                        <input class="input" type="password">
                    </p>
                    <p class="control">
                        <label class="checkbox">
                            <input type="checkbox">
                            有状态服务
                        </label>
                    </p>
                    <p class="control">
                        <span class="help">Dodora容器云会帮您自动生成HTTP和SSH端口</span>
                        <button class="button is-primary">立即创建</button>
                        <button class="button is-link">取消</button>
                    </p>

                </div>

            </div>

        </div>
    </div>
</template>
<style>
</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'
    import ImageViewer from './ImageViewer.vue'

    export default{
        data () {
            return {
                showImageSelectorForm: false,

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
                    free: true
                }, {
                    id: '5',
                    name: '16x',
                    memory: '4 GB',
                    cpu: '1',
                    cpuType: '',
                    free: true
                }]
            }
        },

        created () {

        },

        components: {
            Modal,
            ImageViewer
        },

        methods: {
            hideImageSelectorForm: function() {
                this.showImageSelectorForm = false;
            },

            selectImage: function() {
                this.showImageSelectorForm = true;
            },

            selectThisDockerConfig: function(dockerConfig, key) {
                console.log(dockerConfig, key);
                this.configIsActive[key].isActive = true;
                if(key === this.currentActiveConfig) {
                    this.configIsActive[this.currentActiveConfig].isActive = true;
                }else {
                    this.configIsActive[this.currentActiveConfig].isActive = false;
                }
                this.currentActiveConfig = key;
                console.log(this.configIsActive, key);
            }
        },

        events: {
            'imageOnSelected': function(id) {
                this.showImageSelectorForm = false;
            }
        }

    }
</script>
