<template>
    <div class="container">
        <div class="basic-wrapper">
            
            <div class="columns">
                
                <div class="column is-three-quarters">
                          
                    <label class="label">基本信息</label>
                    <hr class="split">

                    <div class="columns">
                        
                        <div class="column">
                            <label class="label">名称</label>
                            <label class="label is-tip">fuck</label>
                        </div>

                        <div class="column">
                            <label class="label">ID</label>
                            <label class="label is-tip">f8d14eaa248a</label>
                        </div>

                        <div class="column">
                            <label class="label">启动命令</label>
                            <label class="label is-tip">"/bin/sh -c 'service "</label>
                        </div>

                        <div class="column">
                            <label class="label">创建于</label>
                            <label class="label is-tip">44小时之前</label>
                        </div>

                    </div>

                    <div class="columns">
                        
                        <div class="column">
                            <label class="label">开放端口</label>
                            <label class="label is-tip">0.0.0.0:8980->22/tcp, 0.0.0.0:8877->8181/tcp</label>
                        </div>

                    </div>

                    <label class="label">数据卷</label>
                    <hr class="split">            

                    <div class="column">
                        <button class="button is-primary">创建数据卷</button>
                        <span class="help is-tip">您没有创建数据卷</span>
                    </div>

                </div>

                <div class="column">
                    
                    <label class="label">配置信息</label>
                    <hr class="split">
                    <div class="card is-fullwidth">
                        <header class="card-header">
                            <p class="card-header-title">
                            256MB/<span class="is-tip">内存</span>
                            </p>
                        </header>
                        <footer class="card-footer">
                            <a class="card-footer-item">2核/CPU</a>
                            <a class="card-footer-item">10GB/硬盘</a>
                            <a class="card-footer-item">更改</a>
                        </footer>
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

    .split {
        margin: 10px 0;
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

        }
    }
</script>
