<template>
    <div class="container">
        <h1 class="title">我的消息</h1>
        <hr>
        <div class="content">

            <button class="button is-primary">全部标记为已读</button>

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="未读">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>发送人</th>
                          <th>标题</th>
                          <th>发送时间</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for='item in fields'>
                          <td>{{item.sender}}</td>
                          <td>{{item.title}}</td>
                          <td>
                            {{item.createat | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
                          </td>
                          <td class="is-icon">
                              <a @click="showMessageDetailForm = true"><i class="fa fa-search"></i></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur" :all.sync="all" v-on:btn-click="listen"></page>
                </tab-item>
                <tab-item title="已读">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>发送人</th>
                          <th>标题</th>
                          <th>发送时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for='item in fields2'>
                          <td>{{item.sender}}</td>
                          <td>{{item.title}}</td>
                          <td>
                            {{item.createat | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <page :cur.sync="cur1" :all.sync="all1" v-on:btn-click="listen1"></page>
                </tab-item>
            </tab>

            <modal :is-html="true" :is-show.sync="showMessageDetailForm">
                <div slot="header">我的消息</div>
                <div slot="body">

                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="showMessageDetailForm = false">
                    确定
                    </button>
                </div>
            </modal>

        </div>
    </div>
</template>
<style>
</style>
<script>

    import Vue from 'vue'
    import {Tab, TabItem} from '../../ui/Tab'
    import Modal from '../../ui/Modal/Modal.vue'
    import Page from '../../ui/Page/Page.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
              showMessageDetailForm: false,
              fields: [],
              fields2: [],
              cur: 1,
              all: 8,
              cur1: 1,
              all1: 10,
            }
        },
        components: {
            Tab,
            TabItem,
            Modal,
            Page
        },

        methods: {

            listen: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('init1')(data);
            },
            listen1: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('init')(data);
            },
            cancelOrder: function() {

                new ModalCtrl({
                    el: document.createElement('div'),
                    props: {
                        isShow: false,
                        header: {
                            default: '取消订单'
                        },
                        body: {
                            default: '您确定要取消此订单吗？'
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
            init: function(cur) {
              var _self = this;
              var options = {
                  param: {
                    limit: 10,
                    cur: cur,
                    user: currentUser,
                    read: 1
                  },
                  target: 'fields2',
                  all: 'all1',
                  url: 'notices',
                  ctx: _self
              };
              services.Common.list(options);
            },
            init1: function(cur) {

              var _self = this;
              var options = {
                  param: {
                    limit: 1,
                    cur: cur,
                    user: currentUser
                  },
                  url: 'notices',
                  ctx: _self
              };
              services.Common.list(options);
            }
        },
        ready: function() {
            this.$get('init')(1);
            this.$get('init1')(1);
        }
    }
</script>
