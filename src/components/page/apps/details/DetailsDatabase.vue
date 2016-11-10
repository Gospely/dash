<template>
  <div class="container">
    <label class="label">添加数据库</label>
    <p class="control">
        <button class="button is-success" @click="addDatabase">增加</button>
    </p>

    <modal :is-html="true" :is-show.sync="showDatabaseAddingForm">
        <div slot="header">{{databaseInfoFormName}}</div>
        <div slot="body">
            <label class="label">数据库名称</label>
            <p class="control">
              <input class="input" type="text" placeholder="数据库名称" v-model="edit.database">
            </p>
            <p class="label">类型</p>
            <p class="control has-addons" style="height:32px;">
              <a :class="['button','database-type-opation',{'is-success': index == thisIndex}]" v-for="(index,item) in databaseType" :disabled="isDetailsThisDatabase" @click="selectThisType(item,index)">
                <span>{{item.label}}</span>
              </a>
            </p>
        </div>
        <div slot="footer">
            <button class="button is-success"
                @click="confirmAddDatabase">
            确定
            </button>
            <button class="button" @click="hideAddDatabaseForm()">取消</button>
        </div>
    </modal>

    <table class="table">
      <thead>
        <tr >
          <th>数据库名称</th>
          <th>数据库类型</th>
          <th>创建时间</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>mysql</td>
          <td>mysql</td>
          <td>
          2016-10-10
          </td>
          <td class="is-icon" title="详细信息">
            <a @click="DetailsThisDatabase()">
              <i class="fa fa-share"></i>
            </a>
          </td>
          <td class="is-icon" title="删除数据库">
            <a @click="removeThisDatabase()">
              <i class="fa fa-times "></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
  .database-type-opation:hover {
      border-bottom-color: #aeb1b5!important;
  }
</style>
<script>
    import Vue from 'vue'
    import Modal from '../../../ui/Modal/Modal.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                showDatabaseAddingForm: false,
                isDetailsThisDatabase: false,
                databaseInfoFormName: '新增数据库',
                application: '',
                edit:{
                  database: ''
                },
                thisIndex: '0',
                databaseType:[
                    {
                      label: 'mysql'
                    },
                    {
                      label: 'postgre'
                    },
                    {
                      label: 'mongodb'
                    }
                ]
                // fields: [],
                // subDomain: '',
                // oldDomain: '',
                
            }
        },

        components: {
            Modal
        },

        methods: {

            showAddDatabaseForm: function() {
                this.showDatabaseAddingForm = true;
            },

            hideAddDatabaseForm: function() {
                this.showDatabaseAddingForm = false;
            },

            addDatabase: function() {
                this.isDetailsThisDatabase= false;
                this.databaseInfoFormName = '新增数据库';
                this.showAddDatabaseForm();
            },

            confirmAddDatabase: function() {

                // var _self = this;
                // if(this.isDetailsThisDatabase){
                //     services.Common.update({
                //       param: _self.edit,
                //       url: 'domains',
                //       ctx: _self,
                //       reload: _self.$get("initDomains")()
                //     });
                // }else{
                //   services.Common.save({
                //     url: 'domians/bind',
                //     domain: edit.domain,
                //     creator: currentUser,
                //     application: _self.application,
                //     ctx: _self,
                //     reload: _self.$get("initDomains")()
                //   });
                // }
                // this.hideAddDomainForm();
            },

            selectThisType(item,index){
              this.thisIndex = index;
            },

            DetailsThisDatabase: function(item) {
                this.databaseInfoFormName = '数据库详情';
                this.isDetailsThisDatabase = true;
                this.edit = item;
                this.showAddDatabaseForm();
            },

            removeThisDatabase: function(item) {


                var _self = this;
                new ModalCtrl({
                    el: document.createElement('div'),
                    props: {
                        isShow: false,
                        header: {
                            default: '删除数据库'
                        },
                        body: {
                            default: '您确定要执行此操作吗？（此操作无法撤销）'
                        }
                    },
                    events: {
                        'confirmed': function() {
                            console.log(item);


                            // services.Common.delete({

                            //     param:{
                            //         id: item.id,
                            //     },
                            //     url: 'domains',
                            //     ctx: _self,
                            //     reload: _self.$get("initDomains")(),
                            // });
                            this.$destroy(true);

                        }
                    }
                }).show();
            },

            saveChanges: function() {

                // var _self = this;
                // if(this.domains !=  this.oldDomain){

                //     services.Common.update({
                //         param:{
                //           subDomain: _self.subDomain,
                //           oldDomain: _self.oldDomain,
                //           creator: currentUser,
                //           application: _self.application,
                //           reload: _self.$get("initDomains")()
                //         },
                //         url: 'domains',
                //     });
                // }else{
                //     notification.alert("未修改域名，请确认");
                // }
            },
            // initDomains: function() {
            //     console.log(11);
            //     var _self = this;
            //     services.Common.list({

            //         param:{
            //             application: _self.application,
            //         },
            //         url: 'domains',
            //         ctx: _self,
            //     });
            // },
            // initApplication:function(){
            //   var _self = this;
            //   services.Common.getOne({

            //       param:{
            //           id: _self.application,
            //       },
            //       url: 'applications',
            //       cb: function(res){
            //           if(res.status == 200){

            //               var data = res.data;

            //               if(data.code == 1){
            //                 try {
            //                   _self.subDomain = data.fields.domain.replace(".gospely.com","");
            //                   _self.oldDomain = data.fields.domain.replace(".gospely.com","");
            //                 }catch(err) {
            //                   notification.alert('解析域名数据失败: ' + err.toString(), 'warning');
            //                 }
            //               }
            //           }
            //       }
            //   });
            // }

        },
        ready: function() {

            this.$set("application", this.$route.query.containerId);
            // this.$get("initDomains")();
            // this.$get("initApplication")();
        }
    }
</script>
