<template>
    <div class="container">
        <h1 class="title">我的组织</h1>
        <hr>
        <div class="content">

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">创建组织</label>
              </div>
              <div class="control is-grouped">
                    <button style="margin-left:10px" class="button is-primary" @click="startCreateTeam">创建组织</button>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
                  <div class="control-label">
                      <label class="label">组织列表</label>
                  </div>
                  <div class="control is-grouped" v-if="items.length">

                      <div class="team" >

                        <article class="media" v-for="item in items">
                            <figure class="media-left" @click="showTeamDetail(item)" style="cursor: pointer;">
                                <p class="image is-64x64">
                                    <img src="https://dn-daoweb-prod.qbox.me/static/organization_200.png">
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>{{item.name}}</strong>
                                        <br>
                                        <div style="margin-top:5px" >{{item.createdAt}}</div>
                                    </p>
                                </div>
                            </div>
                            <div class="media-right">
                                <button class="delete" @click="delete(item.id)"></button>
                            </div>
                        </article>

                        <hr class="split">
                      </div>

                  </div>

                  <div v-else style="width: 77%; padding-top: 6px">您还未加入任何组织，去加入或者创建吧...</div>

              </div>

              <hr>
            <modal :is-html="true" :is-show.sync="showTeamAddingForm">
                <div slot="header">创建组织</div>
                <div slot="body">
                    <label class="label">组织名称</label>
                    <p class="control">
                      <input class="input" type="text" v-model="team.name" placeholder="给您的团队取个名字吧">
                    </p>
                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="confirmCreateTeam">
                    确定
                    </button>
                    <button class="button" @click="showTeamAddingForm = false">取消</button>
                </div>
            </modal>

            <modal :is-html="true" :is-show.sync="showTeamDetailForm">
                <div slot="header">组织成员</div>
                <div slot="body">
                    <div v-for="item in members">
                        {{item.members}}
                    </div>                  
                  </div>
                  <div slot="footer">
                      <button class="button is-success" @click="showTeamDetailForm = false">确定</button>
                  </div>

  <!--                 <article class="media" v-for="item in items">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="https://dn-daoweb-prod.qbox.me/static/organization_200.png">
                        </p>
                    </figure>
                    <div class="media-content"></div>
                    <div class="media-right" style="height:64px;line-height:64px;">
                        {{item.name}}
                    </div>
                  </article>
                  <hr class="split">
                  <div class="control is-grouped is-horizontal">
                    <div class="control is-grouped">
                          <input type="text" class="input" placeholder="账号" @keyup.enter="invitateMember">
                    </div>
                    <div class="control">
                      <button class="button is-success" @click="invitateMember">邀请成员</button>
                    </div>
                  </div>
                </div>
                <div slot="footer">
                    <button class="button is-success" @click="showTeamDetailForm = false">确定</button>
                </div> -->
            </modal>

        </div>
    </div>
</template>
<style>
</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                showTeamAddingForm: false,
                showTeamDetailForm: false,

                fields: '',
                items: [],
                members:[],
                team:{
                  name: ''
                },

                showAddTeamMember: false
            }
        },
        components: {
            Modal
        },

        methods: {
            invitateMember() {
              alert(2)
            },

            startCreateTeam: function() {
                this.showTeamAddingForm = true;
            },

            confirmCreateTeam: function() {

                this.showTeamAddingForm = false;
                var _self = this;

                function cb(res) {
                  if(res.status === 200) {
                    _self.$get('teamList')(_self);
                    notification.alert('添加成功');
                  }else {

                  }
                }
                var options = {
                    param: {
                      name: this.team.name,
                      creator: currentUser
                    },
                    cb: cb,
                    url: 'teams'
                };
                services.Common.create(options);
            },
            teamList: function() {
              var self = this;
              services.Common.list({
                url: 'teams',
                param: {
                  creator: currentUser
                },
                ctx: self,
                target: 'items'
              });
            },
            delete: function(id) {
                var _self = this;
                function cb(res) {
                  if(res.status === 200) {
                    _self.$get('teamList')(_self);
                    notification.alert('删除成功');
                  }else {

                  }
                }
                var options = {
                    param: {
                      id: id
                    },
                    url: 'teams',
                    cb: cb
                };
                services.Common.delete(options);
            },
            getMembers:function(name){
              var self = this;
              services.Common.list({
                url: 'teams',
                param: {
                  creator: currentUser,
                  name:name
                },
                ctx: self,
                target: 'members',
              });
            },
            showTeamDetail(item) {
              this.getMembers(item.name);
              this.showTeamDetailForm = true;
              // alert(item.name);
            }
        },
        ready: function() {
          this.$get('teamList')();
        },
    }
</script>
