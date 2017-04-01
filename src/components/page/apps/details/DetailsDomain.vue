<template>
    <div class="container">

        <div class="columns">
            <div class="column">
<!--
                <label class="label">修改子域名</label>
                <div class="columns">

                    <div class="column is-half">
                        <p class="control">
                            <input class="input" type="text" placeholder=""  v-model="subDomain">
                        </p>
                    </div>
                    <span class="is-tip" style="line-height: 3.3;">.gospely.com</span>

                    <div class="column">
                        <p class="control">
                            <button class="button is-primary" @click="saveChanges">保存更改</button>
                        </p>
                    </div>

                </div> -->

                <modal :is-html="true" :is-show.sync="showDomainAddingForm">
                    <div slot="header">{{domainInfoFormName}}</div>
                    <div slot="body">
                        <label class="label">域名名称</label>
                        <p class="control">
                          <input class="input" type="text" placeholder="一级域名" v-model='edit.domain'>
                        </p>
                        <!-- <label class="label">CNAME</label>
                        <p class="control has-icon has-icon-right">
                          <input class="input is-success" type="text" placeholder="CNAME" v-model='edit.ip'>
                          <i class="fa fa-check"></i>
                          <span class="help is-success">指向域名</span>
                        </p> -->
                    </div>
                    <div slot="footer">
                        <button class="button is-success"
                            @click="confirmAddDomain">
                        确定
                        </button>
                        <button class="button" @click="hideAddDomainForm()">取消</button>
                    </div>
                </modal>
            </div>
        </div>

        <div class="columns">
            <div class="column">

                <label class="label">绑定域名</label>
                <p class="control">
                    <button class="button is-success" @click="addDomain">增加</button>
                </p>

                <table class="table">
                  <thead>
                    <tr >
                      <th>二级域名</th>
                      <th>主域名</th>
                      <th>CNAME</th>
                      <th>绑定时间</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in fields">
                      <td>{{item.subDomain}}</td>
                      <td>{{item.domain}}</td>
                      <td>{{item.ip}}</td>
                      <td>
                      {{item.createat | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
                      </td>
                      <td class="is-icon" title="编辑信息">
                        <a @click="editThisDomain(item)">
                          <i class="fa fa-edit"></i>
                        </a>
                      </td>
                      <td class="is-icon" title="删除绑定">
                        <a @click="removeThisDomain(item)">
                          <i class="fa fa-times "></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>

    </div>
</template>
<style>
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
                domainInfoFormName: '绑定域名',
                application: '',
                fields: [],
                subDomain: '',
                oldDomain: '',
                edit:{
                  domain: '',
                  ip: '',
                  id: ''
                },
            }
        },

        components: {
            Chart,
            Modal
        },

        methods: {

            showAddDomainForm: function() {

                this.isEditDomain = false;
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

                var _self = this;
                console.log(this.isEditDomain);
                if(this.isEditDomain){
                    services.Common.update({
                      param: _self.edit,
                      url: 'domains',
                      ctx: _self,
                      reload: _self.$get("initDomains")(1)
                    });
                }else{
                  services.Common.create({
                    url: 'domains',
                    param: {
                        domain: this.edit.domain,
                        ip: this.edit.ip,
                        creator: currentUser,
                        application: _self.application,
                    },
                    ctx: _self,
                    reload: function(){
                         _self.$get("initDomains")(1);
                    },
                  });
                }
                this.hideAddDomainForm();
            },

            editThisDomain: function(item) {

                this.domainInfoFormName = '修改域名';
                this.isEditDomain = true;
                this.edit = item;
                this.showAddDomainForm();
            },

            removeThisDomain: function(item) {


                var _self = this;
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
                            console.log(item);


                            services.Common.delete({

                                param:{
                                    id: item.id,
                                },
                                url: 'domains',
                                ctx: _self,
                                reload: function(){
                                     _self.$get("initDomains")(1);
                                },
                            });
                            this.$destroy(true);

                        }
                    }
                }).show();
            },

            saveChanges: function() {

                var _self = this;
                if(this.domains !=  this.oldDomain){

                    services.Common.update({
                        param:{
                          subDomain: _self.subDomain,
                          oldDomain: _self.oldDomain,
                          creator: currentUser,
                          application: _self.application,
                          reload: _self.$get("initDomains")()
                        },
                        url: 'domains',
                    });
                }else{
                    notification.alert("未修改域名，请确认");
                }
            },
            initDomains: function() {
                console.log(11);
                var _self = this;
                services.Common.list({

                    param:{
                        application: _self.application,
                    },
                    url: 'domains',
                    ctx: _self,
                });
            },
            initApplication:function(){
              var _self = this;
              services.Common.getOne({

                  param:{
                      id: _self.application,
                  },
                  url: 'applications',
                  cb: function(res){
                      if(res.status == 200){

                          var data = res.data;

                          if(data.code == 1){
                            try {
                              _self.subDomain = data.fields.domain.replace(".gospely.com","");
                              _self.oldDomain = data.fields.domain.replace(".gospely.com","");
                            }catch(err) {
                              notification.alert('解析域名数据失败: ' + err.toString(), 'warning');
                            }
                          }
                      }
                  }
              });
            }

        },
        ready: function() {

            this.$set("application", this.$route.query.containerId);
            this.$get("initDomains")();
            this.$get("initApplication")();
        }
    }
</script>
