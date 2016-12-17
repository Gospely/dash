<template>
    <div class="container">
        <h1 class="title">应用列表</h1>
        <h2 class="subtitle">这里有您在<strong>dodora容器云</strong>上部署的所有应用</h2>
        <hr>
        <div class="content">

            <a class="button is-primary" v-link="{path: '/apps/new'}">创建应用</a>

            <a class="button is-primary" v-bind:class="{'is-loading': isRefresh}" @click="refreshAppList">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </a>

            <modal :is-html="true" :width="800" :is-show.sync="showPayForm">
                <div slot="header">您正在对应用 {{description}} 进行付款操作</div>
                <div slot="body">

                    <div class="columns">
                        <div class="column">
                            <pay-method :val.sync="qrcode"></pay-method>
                        </div>
                    </div>

                    <div class="media-content">
                      <div class="content">
                        <div class="media-right" style="text-align:right">
                            <span class="is-tip">合计：</span>
                            <span class="is-big">{{price}} 元</span>
                        </div>
                      </div>
                    </div>

                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="confirmToPay">
                    确定支付
                    </button>
                    <button class="button" @click="showPayForm = false">取消</button>
                </div>
            </modal>

            <tab :active-index="0" style="width: 100%;">
                <tab-item title="已部署">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>镜像(运行环境)</th>
                          <th>状态</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields">
                          <td>{{item.name}}</td>
                          <td>{{item.image}}</td>
                          <td>
                            已部署
                          </td>
                          <td class="is-icon" title="进入应用">
                            <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>

                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur" :all.sync="all" v-on:btn-click="listen"></page>
                </tab-item>
                <tab-item title="未支付">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>镜像(运行环境)</th>
                          <th>状态</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_notpaid">
                            <td>{{item.name}}</td>
                            <td>{{item.image}}</td>
                          <td>
                            未支付
                          </td>
                          <td class="is-icon" title="支付">
                            <a @click="payForApp(item)">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur_stop" :all.sync="all_stop" v-on:btn-click="listen_stop"></page>
                </tab-item>
                <tab-item title="未部署">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>镜像(运行环境)</th>
                          <th>状态</th>
                          <th>详情</th>
                          <th>部署</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_stop">
                            <td>{{item.name}}</td>
                            <td>{{item.image}}</td>
                            <td>
                                未部署
                            </td>
                            <td class="is-icon" title="进入应用">
                                <a class="tdInline" v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>
                                
                            </td>
                            <td class="is-icon" title="部署">
                                <a class="tdInline" @click="deployThisApp(item)">
                                  <i class="fa fa-cogs"></i>
                                </a>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur_stop" :all.sync="all_stop" v-on:btn-click="listen_stop"></page>
                </tab-item>

                <tab-item title="数据库">
                    <label class="label">添加数据库</label>
                    <p class="control">
                        <button class="button is-success" @click="addDatabase">增加</button>
                    </p>

                    <modal :is-html="true" :is-show.sync="showDatabaseAddingForm">
                        <div slot="header">{{databaseInfoFormName}}</div>
                        <div slot="body">
                            <label class="label">数据库名称</label>
                            <p class="control">
                              <input class="input" type="text" @blur="checkExit" placeholder="数据库名称" v-model="db.name">
                            </p>
                          <label class="label">数据库密码</label>
                          <p class="control">
                            <input class="input" type="text" placeholder="数据密码" v-model="db.password">
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
                        <tr>
                          <th>数据库名称</th>
                          <th>数据库类型</th>
                          <th>创建时间</th>
                          <th>说明</th>
                          <th>详情</th>
                          <th>删除</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_db">
                          <td>{{item.name}}</td>
                          <td>{{item.type}}</td>
                          <td>
                          {{item.createat | dateFormat 'yyyy-MM-dd hh:mm:ss'}}
                          </td>
                          <td>
                          {{item.description}}
                          </td>
                          <td class="is-icon" title="详细信息">
                            <a @click="DetailsThisDatabase(item)">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                          <td class="is-icon" title="删除数据库">
                            <a @click="removeThisDatabase(item)">
                              <i class="fa fa-times "></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <page :cur.sync="cur_db" :all.sync="all_db" v-on:btn-click="listen_db"></page>
                </tab-item>
            </tab>
        </div>

        <modal :is-html="true" :width="800" :is-show.sync="showDeployMoal">
                <div slot="header">您正在部署应用 {{deployApp.appName}}</div>
                <div slot="body">

                    <div class="control is-horizontal user-center">
                      <div class="control-label">
                        <label class="label">容器配置&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="control is-grouped">

                        <div class="columns" style="margin-left: 82px;">

                            <div class="column" v-for="(key, val) in deployApp.dockerConfigs">
                                <div v-bind:class="['docker-config-box',{'active': deployApp.configIsActive[key].isActive}]" @click="selectThisDockerConfig(val, key)">
                                    <ul class="text-center parameter">
                                        <li>{{val.memory}} 内存</li>
                                        {{val.cpu}} CPU{{val.cpuType}}
                                    </ul>
                                    <div class="down-style">{{val.name}}</div>
                                </div>
                            </div>

                        </div>

                      </div>
                    </div>

                    <hr v-show="deployApp.showCaculateResourceSlider">

                    <div v-show="deployApp.showCaculateResourceSlider" class="control is-horizontal user-center">
                      <div class="control-label">
                        <label class="label">使用时长&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="control is-grouped" style="margin-left:30px">
                        <div class="columns">
                            <div class="column">
                               <cyc :price.sync="deployApp.price"></cyc>
                            </div>
                        </div>
                      </div>
                    </div>

                    <hr>

                    <div class="control is-horizontal user-center">
                      <div class="control-label">
                        <label class="label">ssh地址&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="control is-grouped">
                        <p class="control is-expanded">
                            <input class="input" type="text" placeholder="ssh地址" v-model="deployApp.sshAddress">
                        </p>
                      </div>
                    </div>

                    <hr>

                    <div class="control is-horizontal user-center">
                      <div class="control-label">
                        <label class="label">ssh密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="control is-grouped">
                        <p class="control is-expanded">
                            <input class="input" type="password" placeholder="ssh密码" v-model="deployApp.sshPassword">
                        </p>
                      </div>
                    </div>
                    
                    <hr>
                    <p class="control">
                      <label class="checkbox">
                        <input type="checkbox" v-model="deployApp.isCreatedDatabase">
                        创建本地数据库
                      </label>
                    </p>

                    <hr v-show="deployApp.isCreatedDatabase">
                    
                    <div class="control is-horizontal user-center" v-show="deployApp.isCreatedDatabase">
                        <div class="control-label">
                            <label class="label">数据库名称</label>
                        </div>
                        <div class="control is-grouped">
                            <p class="control is-expanded">
                                <input class="input" type="text" @blur="checkExit" placeholder="数据库名称" v-model="db.name">
                            </p>
                        </div>
                    </div>

                    <hr v-show="deployApp.isCreatedDatabase">
                    <div class="control is-horizontal user-center" v-show="deployApp.isCreatedDatabase">
                        <div class="control-label">
                            <label class="label">数据库密码</label>
                        </div>
                        <div class="control is-grouped">
                            <p class="control is-expanded">
                                <input class="input" type="text" placeholder="数据库密码" v-model="db.password">
                            </p>
                        </div>
                    </div>

                    <hr v-show="deployApp.isCreatedDatabase">
                    <div class="control is-horizontal user-center" v-show="deployApp.isCreatedDatabase">
                        <div class="control-label">
                            <p class="label">数据库类型&nbsp;&nbsp;</p>
                        </div>
                        <div class="control is-grouped">
                            <p class="control has-addons" style="height:32px;">
                                <a :class="['button','database-type-opation',{'is-primary': index == thisIndex}]" v-for="(index,item) in databaseType" :disabled="isDetailsThisDatabase" @click="selectThisType(item,index)">
                                  <span>{{item.label}}</span>
                                </a>
                            </p>
                        </div>
                    </div>

                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="goToDeployApp">
                    部署
                    </button>
                    <button class="button" @click="showDeployMoal = false">取消</button>
                </div>
        </modal>
    </div>
</template>
<style>
  .database-type-opation:hover {
      border-bottom-color: #aeb1b5!important;
  }
  .tdInline {
    display: inline;
  }
</style>
<script>

    import {Tab, TabItem} from '../../ui/Tab'
    import Page from '../../ui/Page/Page.vue'
    import Modal from '../../ui/Modal/Modal.vue'
    import Cyc from '../../ui/Cyc.vue'
    import PayMethod from '../../ui/PayMethod.vue';

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                showDatabaseAddingForm: false,
                isDetailsThisDatabase: false,
                databaseInfoFormName: '新增数据库',

                deployApp: {
                    appName: '',
                    dockerConfigs: [],
                    configIsActive: [{
                        isActive: true
                    }, {
                        isActive: false
                    }, {
                        isActive: false
                    }, {
                        isActive: false
                    }, {
                        isActive: false
                    }],
                    currentActiveConfig: 0,
                    showCaculateResourceSlider: false,
                    price: '10 X 100 = 1000',
                    unitPrice: '',
                    sshAddress: '',
                    sshPassword: '',
                    total: '',
                    isCreatedDatabase: false

                },
                showDeployMoal: false,

                edit:{
                  database: ''
                },
                thisIndex: '0',
                databaseType:[
                    {
                      label: 'mysql'
                    },
                    {
                      label: 'postgres'
                    },
                    {
                      label: 'mongodb'
                    }
                ],
                application: '',
                db:{
                  name: '',
                  type: '',
                  password: '',
                  docker: '',
                  creator: currentUser
                },
                isRefresh: false,
                currentIndex:0,
                fields: [],
                fields_stop: [],
                fields_notpaid: [],
                fields_db: [],
                all_db: 8,
                cur_db: 1,
                cur: 1,
                all: 8,
                cur_stop: 1,
                all_stop: 8,
                all_notpaid: 8,
                cur_notpaid: 1,

                showPayForm: false,
                qrcode: '',
                description: '',
                price: '',
                isWechat: false,
                isAlipay: true,
                orderNo: ''
            }
        },

        components: {
            Tab,
            TabItem,
            Page,
            Modal,
            PayMethod,
            Cyc
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
            checkExit: function() {
              console.log("check");
              var _self =  this;
              services.Common.count({
                url: 'dbs',
                param: {
                  name: this.db.name,
                  creator: currentUser
                },
                cb:function(res) {
                  var data = res.data;
                  if(data.code == 1 ){
                    console.log(data);
                    var count = parseInt(data.fields )
                    if(count > 0){
                      console.log(count);
                        _self.db.name = '';
                        notification.alert('该数据库名已存在','danger');
                    }
                  }
                }
              });
            },
            confirmAddDatabase: function() {

                if(this.db.type == ''){
                  this.db.type= 'mysql';
                }
                var _self = this;
                services.Common.create({
                  url: 'dbs',
                  param: this.db,
                  ctx: this,
                  reload: function(cur){
                    _self.$get('initDb')(cur);
                  }
                });
                this.showDatabaseAddingForm = false;
            },

            selectThisType(item,index){
              this.thisIndex = index;
              this.db.type =  item.label;
            },

            deployThisApp(item) {
                this.deployApp.appName = item.name;
                this.showDeployMoal = true;
            },

            goToDeployApp() {
                this.showDeployMoal = false;
            },

            selectThisDockerConfig: function(dockerConfig, key) {

                // this.application.products = dockerConfig.id;
                // this.application.image = dockerConfig.id;
                // this.application.free = dockerConfig.free;

                var unit = '';
                if(dockerConfig.memoryUnit == "MB"){
                    unit = 'm'
                }else{
                    unit = 'g'
                }
                // this.application.memory = dockerConfig.memory + unit;
                this.deployApp.showCaculateResourceSlider = !dockerConfig.free;

                this.deployApp.configIsActive[key].isActive = true;
                if(key === this.deployApp.currentActiveConfig) {
                    this.deployApp.configIsActive[this.currentActiveConfig].isActive = true;
                }else {
                    this.deployApp.configIsActive[this.deployApp.currentActiveConfig].isActive = false;
                }

                this.deployApp.currentActiveConfig = key;
                this.deployApp.unitPrice = dockerConfig.price;
                // this.application.unitPrice = dockerConfig.price;

                // this.total = this.unitPrice;
                this.deployApp.price = this.deployApp.unitPrice +"X 1月 = " + this.deployApp.unitPrice;


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


                            services.Common.delete({

                                param:{
                                    id: item.id,
                                },
                                url: 'dbs',
                                ctx: _self,
                                reload: function(cur) {
                                  _self.$get("initDb")(cur);
                                }
                            });
                            this.$destroy(true);

                        }
                    }
                }).show();
            },

            listen: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('init')(data);
            },

            listen_stop: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initStop')(data);
            },

            listen_unBind: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initUnBind')(data);
            },
            listen_db: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initDb')(data);
            },

            stopThisAPP: function() {

            },

            confirmToPay: function() {

              console.log(this.isAlipay);
              if(this.isAlipay){
                services.OrderService.order({
                  out_trade_no: this.orderNo,
                  price: this.price,
                  type: 'alipay',
                }).then(function(res){
                    console.log(res);
                    window.location.href = res.body;
                },function(err,res){

                });
              }else{
                notification.alert("请确认微信扫码支付完成");
              }
              this.showPayForm = false;
            },

            refreshAppList: function() {
                this.isRefresh = true;
                if (this.currentIndex == 0) {
                  this.$get("init")(1);
                }else{
                  this.$get("initStop")(1);
                }
            },

            init: function(cur) {

                var _self = this;
                var options = {
                  param: {
                    limit: 10,
                    cur: cur,
                    status: 1,
                    creator: currentUser
                  },
                  url: "applications",
                  ctx: _self,
                  reload:function () {
                    if (_self.isRefresh) {
                      notification.alert("刷新成功");
                    }
                    _self.isRefresh = false;
                  }
                }

                services.Common.list(options);
            },
            initNotpaid: function(cur) {

                var _self = this;
                var options = {

                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    pay_status: -1,
                    creator: currentUser
                  },
                  target: 'fields_notpaid',
                  all: 'all_notpaid',
                  ctx: _self,
                  reload:function () {
                    if (_self.isRefresh) {
                      notification.alert("刷新成功");
                    }
                    _self.isRefresh = false;
                  }
                }

                services.Common.list(options);
            },
            initStop: function(cur) {

                var _self = this;
                var options = {

                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    status: -1,
                    creator: currentUser
                  },
                  target: 'fields_stop',
                  all: 'all_stop',
                  ctx: _self,
                  reload:function () {
                    if (_self.isRefresh) {
                      notification.alert("刷新成功");
                    }
                    _self.isRefresh = false;
                  }
                }

                services.Common.list(options);
            },
            initDb: function(cur) {

                var _self = this;
                var options = {

                  url: "dbs",
                  param: {
                    limit: 10,
                    cur: cur,
                    creator: currentUser
                  },
                  target: 'fields_db',
                  all: 'all_db',
                  ctx: _self
                }
                services.Common.list(options);
            },

            initDockerConfig: function() {

                var _self =  this;
                function callback(res){

                    console.log("callback");
                    var data = res.data;
                    var arr = new Array();

                    for(var i = 0; i < data.fields.length; i++){

                        var active = false;

                        if(i === 0) {
                            active = true;
                        }

                        arr.push({
                            isActive: active
                        });

                        if(data.fields[i].free) {
                          _self.deployApp.currentActiveConfig = i;
                          // _self.application.products = data.fields[i].id;
                        }
                    }
                    _self.deployApp.dockerConfigs = data.fields;
                    _self.deployApp.configIsActive = arr;
                }

                var options = {

                    param: {
                        type: 'docker'
                    },
                    ctx: _self,
                    url: "products",
                    cb: callback
                }

                services.Common.list(options);
            },

            payForApp: function(item) {

              this.orderNo = item.orderNo;
              var _self = this;
              services.Common.getOne({
                url: 'orders',
                param: {
                  id: item.orderNo
                },
                cb: function(res) {

                  var data = res.data;
                  if(data.code == 1) {

                    _self.description = data.fields.name;
                    _self.price =  data.fields.price;
                    _self.showPayForm = true;
                    _self.orderNo = data.fields.orderNo;
                    services.OrderService.order({

                      out_trade_no: data.fields.orderNo,
                      price: data.fields.price,
                      type: 'wechat'
                    }).then(function(res){
                        console.log(res);
                        _self.qrcode = res.data.code_url;
                        //window.location.href = res.body;
                    },function(err,res){

                    });
                  }
                }
              });

            }
        },
        ready: function() {

            this.$get("init")(1);
            this.$get("initStop")(1);
            this.$get("initNotpaid")(1);
            this.$get("initDb")(1);
            this.$set("application", this.$route.query.containerId);
            this.$get('initDockerConfig')();
        },
        events:{
          'selected':function (index) {
            this.currentIndex = index;
          },

          'weixin': function() {

            console.log("wechat");
            this.isWechat = true;
            this.isAlipay = false;
          },

          'alipay': function() {
            this.isWechat = false;
            this.isAlipay = true;
          },

          'cycSelected': function(cyc) {
                this.deployApp.total = cyc.cyc * this.deployApp.unitPrice;
                // this.size = cyc.cyc;
                // this.application.size = cyc.cyc;
                // this.application.unit = cyc.unit;
                this.deployApp.price = this.deployApp.unitPrice + " X " + cyc.cyc + " " + cyc.unit + " = " + this.deployApp.total;
                console.log(cyc);
            },
        }
    }
</script>
