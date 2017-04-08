<template>
    <div class="container">

        <div class="columns">
            <div class="column">

                <label class="label">二级域名</label>
                <div class="columns">

                    <!-- <div class="column is-half">
                        <p class="control">
                            <input class="input" type="text" placeholder=""  v-model="subDomain">
                        </p>
                    </div> -->
                    <div class="column is-half">
                        <p class="control">
                            <h4 class="is-tip" style="line-height: 3.3; margin-left: 10px">{{subDomainshow}}</h4>
                        </p>
                    </div>


                    <!-- <div class="column">
                        <p class="control">
                            <button class="button is-primary" @click="saveChanges">保存更改</button>
                        </p>
                    </div> -->

                </div>

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

                <modal :is-html="true" :is-show.sync="showQuestionModal">
                    <div slot="header">怎么让一级域名生效？</div>
                    <div slot="body">
                        <p class="control">
                            还差最后一步，即可开始使用 绑定的一级域名<br>

                              到域名注册的地方将 DNS 修改为：<br>

                              f1g1ns1.dnspod.net<br>
                              f1g1ns2.dnspod.net<br>
                              注意不能同时和其他 DNS 混用，会导致解析混乱哦～<br>

                              修改 DNS 服务器需要最长 72 小时的全球生效时间，请耐心等待<br>

                              遇到困难？
                              <a href="https://support.dnspod.cn/Kb/showarticle/tsid/177/#ChangeDomainNS">修改域名DNS地址教程 »</a>
                        </p>
                    </div>
                    <div slot="footer">
                        <button class="button is-success"
                            @click="hideQeustForm">
                            确定
                        </button>
                        <button class="button" @click="hideQeustForm()">取消</button>
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
                      {{item.createat | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
                      </td>
                      <td class="is-icon" title="编辑信息" v-show="!item.sub">
                        <a @click="showQuestion()">
                          <i class="fa fa-question"></i>
                        </a>
                      </td>
                      <td class="is-icon" title="编辑信息" v-show="item.sub">

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
                showQuestionModal: false,
                isEditDomain: false,
                domainInfoFormName: '绑定域名',
                application: '',
                fields: [],
                subDomain: '',
                subDomainshow: '',
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

            showQuestion: function() {

                console.log('showQuestionModal');
                this.showQuestionModal = true;
            },
            hideQeustForm: function() {
                console.log('showQuestionModal');
                this.showQuestionModal = false;
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
                        sub: false
                    },
                    url: 'domains',
                    ctx: _self,
                });
                services.Common.list({

                    param:{
                        application: _self.application,
                        sub: true
                    },
                    url: 'domains',
                    ctx: _self,
                    cb: function(res){
                        var data = res.data;
                        console.log(res);
                        if(data.code == 1){
                            _self.subDomainshow = data.fields[0].subDomain + '.' + data.fields[0].domain
                        }
                    }
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
