<template>
    <div class="container">

        <div class="columns">
            <div class="column">

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

                </div>

                <modal :is-html="true" :is-show.sync="showDomainAddingForm">
                    <div slot="header">{{domainInfoFormName}}</div>
                    <div slot="body">
                        <label class="label">域名名称</label>
                        <p class="control">
                          <input class="input" type="text" placeholder="域名名称" v-model='edit.domain'>
                        </p>
                        <label class="label">CNAME</label>
                        <p class="control has-icon has-icon-right">
                          <input class="input is-success" type="text" placeholder="CNAME" v-model='edit.ip'>
                          <i class="fa fa-check"></i>
                          <span class="help is-success">指向域名</span>
                        </p>
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
                      <th>域名</th>
                      <th>CNAME</th>
                      <th>绑定时间</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in fields">
                      <td>{{item.domain}}</td>
                      <td>{{item.ip}}</td>
                      <td>
                      {{item.createat}}
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
                if(this.isEditDomain){
                    services.Common.update({
                      param: _self.edit,
                      url: 'domains',
                      ctx: _self,
                      reload: _self.$get("initDomains")()
                    });
                }else{
                  services.Common.save({
                    domain: edit.domain,
                    ip: edit.ip,
                    creator: currentUser,
                    application: _self.application,
                    ctx: _self,
                    reload: _self.$get("initDomains")()
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
                                reload: _self.$get("initDomains")(),
                            });
                            this.$destroy(true);

                        }
                    }
                }).show();
            },

            saveChanges: function() {

                var _self = this;
                if(this.domains !=  this.oldDomain){

                    services.Common.create({
                        param:{
                          domain: _self.subDomain,
                          creator: currentUser,
                          application: _self.application,
                          reload: _self.$get("initDomains")()

                        },
                        url: 'domains',
                        cb:function(res){
                            if(res.status == 200){

                                services.Common.update({
                                    param:{
                                      id: _self.application,
                                      domain:  _self.subDomain + '.gospely.com',
                                    },
                                    url: 'applications',
                                    ctx: _self,
                                    reload: _self.$get("initApplication")()
                                });

                            }
                        }
                    });
                }else{
                    notification.alert("未修改域名，请确认");
                }
            },
            initDomains: function() {

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
                              _self.subDomain = data.fields.domain.replace(".gospely.com","");
                              _self.oldDomain = data.fields.domain.replace(".gospely.com","");
                          }
                      }
                  }
              });
            }

        },
        ready: function() {

            var split = window.location.href.split("/")
            this.application = split[split.length -1 ];
            this.$get("initDomains")();
            this.$get("initApplication")();
        }
    }
</script>
