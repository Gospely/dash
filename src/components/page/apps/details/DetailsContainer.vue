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
                            <label class="label is-tip">{{fields.name}}</label>
                        </div>

                        <div class="column">
                            <label class="label">ID</label>
                            <label class="label is-tip">{{fields.id}}</label>
                        </div>

                        <div class="column">
                            <label class="label">启动命令</label>
                            <label class="label is-tip">{{fields.Args}}</label>
                        </div>

                        <div class="column">
                            <label class="label">创建于</label>
                            <label class="label is-tip">{{fields.Created}}</label>
                        </div>

                    </div>

                    <div class="columns">

                        <div class="column">
                            <label class="label">开放端口</label>
                            <label class="label is-tip">{{fields.HostConfig.PortBindings.8089/tcp.HostPort}}</label>
                        </div>

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

</style>
<script>
    import Vue from 'vue'
    import Modal from '../../../ui/Modal/Modal.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
              appId: "",
                fields: {},
                showDomainAddingForm: false,
                isEditDomain: false,
                domainInfoFormName: '绑定域名'
            }
        },

        components: {
            Chart,
            Modal,
        },
        ready (){
          var self = this;
          self.$set("appId", self.$route.params.containerId)
          self.inspect();
          self.logme();
        },
        methods: {
        inspect: function(){
          var self = this;
          var option = {
            param: {
              containerName: self.appId,
            },
            url: "container/inspect"
          };
          services.Common.containerOperate(option);
        },

          logme: function(){
            console.log("docker",this.fields);
          },
        }
    }
</script>
