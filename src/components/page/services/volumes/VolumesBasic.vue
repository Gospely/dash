<template>
    <div class="container">
        <div class="basic-wrapper">
            
            <div class="columns">
                
                <div class="column is-three-quarters">

                    <div class="columns">
                        <div class="column is-half">
                            
                            <h4>Gospel_Volumes</h4>
                            <h4 class="subtitle">部署于：24小时前</h4>

                            <button class="button is-primary">文件资源管理器</button>
                        </div>

                        <div class="column is-half">
                            
                            <span class="help is-tip">数据卷配置: <span style="display:inline" class="help is-success">分布式存储</span></span>

                            <span class="help is-tip">数据卷大小: </span>
                            <p class="control">
                                <div class="columns">
                                    <div class="column">
                                        <input v-model="volume.size" min="10" max="20" step="10" class="slider" type="range">                            
                                    </div>
                                    <div class="column">
                                        <span class="help is-tip" style="margin: -7px;">{{volume.size}} G

                                        <button style="margin-left: 5px;" class="button is-small is-warning">更改</button>

                                        </span>               
                                    </div>                            
                                </div>
                            </p>

                        </div>
                    </div>

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
    import Slider from 'vue-bulma-slider'    

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                showDomainAddingForm: false,
                isEditDomain: false,
                domainInfoFormName: '绑定域名',

                volume: {
                  size: 10
                }
            }
        },

        components: {
            Modal,
            Slider
        },

        methods: {

            saveChanges: function() {

            }

        }
    }
</script>
