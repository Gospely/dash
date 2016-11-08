<template>
    <div class="container">
        <div class="basic-wrapper">

            <div class="columns">

                <div class="column">

                    <label class="label">容器信息</label>
                    <hr class="split">

                    <div class="columns">

                        <div class="column">
                            <label class="label">名称</label>
                            <label class="label is-tip" title="{{containerInfo.Name}}">{{containerInfo.Name | dockerNamefilter}}</label>
                        </div>

                        <div class="column">
                            <label class="label">ID</label>
                            <label class="label is-tip" title="{{containerInfo.Id}}">{{containerInfo.Id}}</label>
                        </div>

                        <div class="column">
                            <label class="label">创建于</label>
                            <label class="label is-tip" title="{{containerInfo.Created}}">{{containerInfo.Created}}</label>
                        </div>

                        <div class="column">
                            <label class="label">内存</label>
                            <label class="label is-tip" title="{{containerInfo.Args}}">{{containerInfo.HostConfig.Memory | memory}}</label>
                        </div>

                    </div>

                    <div class="columns">

                        <div class="column is-3">
                            <label class="label">开放端口</label>
                            <label class="label is-tip" v-for="host in containerInfo.HostConfig.PortBindings">{{host | hostConfig}}</label>
                        </div>

                        <div class="column">
                            <label class="label">启动命令</label>
                            <label style="word-wrap:break-word" class="label is-tip" title="{{containerInfo.Args}}">{{containerInfo.Args}}</label>
                        </div>

                    </div>

                </div>

<!--                 <div class="column">

                    <label class="label">配置信息</label>
                    <hr class="split">
                    <div class="card is-fullwidth">
                        <header class="card-header">
                            <p class="card-header-title">
                            {{containerInfo.HostConfig.Memory | memory}}/<span class="is-tip">内存</span>
                            </p>
                        </header>
                        <footer class="card-footer">
                            <a class="card-footer-item">2核/CPU</a>
                            <a class="card-footer-item">10GB/硬盘</a>
                            <a class="card-footer-item">更改</a>
                        </footer>
                    </div>

                </div> -->

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
                containerInfo: [],
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
            self.$set("appId", self.$route.query.containerId)
            self.$get('inspect')();
        },
        methods: {
            inspect: function(){
              var self = this;
              var option = {
                param: {
                  containerName: self.appId,
                },
                cb: function(res) {

                    console.log(res);

                    if(res.status == 200){
                        var data = res.data;
                        if(data.code === 1 || data.code === 200) {
                            self.containerInfo = JSON.parse(data.fields);
                            if(self.containerInfo.length > 0) {
                                self.containerInfo = self.containerInfo[0];
                            }
                        }else {
                            notification.alert(data.message, 'warning');
                        }

                    }else {
                        notification.alert(data.body, 'warning');
                    }
                },
                url: "container/inspect",
                target: self.containerInfo,
              };
              services.Common.containerOperate(option);
            }
        }
    }
</script>
