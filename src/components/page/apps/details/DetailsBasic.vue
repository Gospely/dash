<template>
    <div class="container">
        <div class="basic-wrapper">
            
            <div class="columns">
                <div class="column is-half">
                    
                    <h4>Gospel_docker</h4>
                    <h4 class="subtitle">部署于：24小时前</h4>

                    <button class="button is-success">启动</button>
                    <button class="button is-danger">停止</button>
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

            <hr>


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

            showAddDomainForm: function() {
                this.showDomainAddingForm = true;
            },

            hideAddDomainForm: function() {
                this.showDomainAddingForm = false;
            },

            addDomain: function() {
                this.isEditDomain = true;
                this.domainInfoFormName = '绑定域名';
                this.showAddDomainForm();
            },

            confirmAddDomain: function() {
                this.hideAddDomainForm();
            },

            editThisDomain: function() {
                this.domainInfoFormName = '修改域名';
                this.isEditDomain = true;
                this.showAddDomainForm();
            },

            removeThisDomain: function() {
                new ModalCtrl({
                    el: document.createElement('div'),
                    props: {
                        isShow: false,
                        header: {
                            default: '删除域名'
                        },
                        body: {
                            default: '您确定要执行此操作吗？（此操作无法撤销）'
                        }
                    },
                    events: {
                        'confirmed': function() {
                            console.log('sssss');
                            this.$destroy(true);
                        }
                    }
                }).show();
            },

            saveChanges: function() {

            }

        }
    }
</script>
