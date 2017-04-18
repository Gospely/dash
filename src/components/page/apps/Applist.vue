<template>
    <div class="container">
        <h1 class="title">应用列表</h1>
        <h2 class="subtitle">这里有您在<strong>Gospel 容器云</strong>上部署或创建的所有应用</h2>
        <hr>
        <div class="content">

            <a class="button is-primary" @click="createAppInIDE">创建应用(IDE)</a>

            <a class="button is-primary" v-link="{path: '/apps/new'}">快速应用部署</a>

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
                <tab-item title="运行中">
                    <loading v-show="!IDEAppLoaded"></loading>
                    <table class="table" v-show="IDEAppLoaded">
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
                            运行中
                          </td>
                          <td class="is-icon" title="进入应用">
                            <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>

                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields.length" v-show="IDEAppLoaded">
                      您还没有运行中的应用，快去启动一个吧...
                    </article>
                    <page :cur.sync="cur" :all.sync="all" v-on:btn-click="listen"></page>
                </tab-item>
                <tab-item title="未支付">
                    <loading v-show="!unPaidAppLoaded"></loading>
                    <table class="table" v-show="unPaidAppLoaded">
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
                            待支付
                          </td>
                          <td class="is-icon" title="支付">
                            <a @click="payForApp(item)">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_notpaid.length" v-show="unPaidAppLoaded">
                      您还没有未支付应用...
                    </article>
                    <page :cur.sync="cur_stop" :all.sync="all_stop" v-on:btn-click="listen_stop"></page>
                </tab-item>
                <tab-item title="已停止">
                    <loading v-show="!appLoaded"></loading>
                    <table class="table" v-show="appLoaded">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>镜像(运行环境)</th>
                          <th>状态</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_stop">
                            <td>{{item.name}}</td>
                            <td>{{item.image}}</td>
                            <td>
                                已停止
                            </td>
                            <td class="is-icon" title="进入应用">
                                <a class="tdInline" v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>

                            </td>
<!--                             <td class="is-icon" title="部署">
                                <a class="tdInline" @click="deployThisApp(item)">
                                  <i class="fa fa-cogs"></i>
                                </a>
                            </td>
 -->                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_stop.length" v-show="appLoaded">
                      您暂时还没有已停止的应用...
                    </article>
                    <page :cur.sync="cur_stop" :all.sync="all_stop" v-on:btn-click="listen_stop"></page>
                </tab-item>
                <tab-item title="HTML5">
                    <loading v-show="!appLoaded"></loading>
                    <table class="table" v-show="appLoaded">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>类型</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_html5">
                            <td>{{item.name}}</td>
                            <td>HTML5</td>
                            <td class="is-icon" title="进入应用">
                            <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_html5.length" v-show="appLoaded">
                      您暂时还没有HTML5应用...
                    </article>
                    <page :cur.sync="cur_html" :all.sync="all_html" v-on:btn-click="listen_html"></page>
                </tab-item>
                <tab-item title="可视化应用">
                    <loading v-show="!appLoaded"></loading>
                    <table class="table" v-show="appLoaded">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>类型</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_vd">
                            <td>{{item.name}}</td>
                            <td>可视化应用</td>
                            <td class="is-icon" title="进入应用">
                                <a class="tdInline" v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_vd.length" v-show="appLoaded">
                      您暂时还没有HTML5应用...
                    </article>
                    <page :cur.sync="cur_vd" :all.sync="all_vd" v-on:btn-click="listen_vd"></page>
                </tab-item>
                <tab-item title="PHP应用">
                    <loading v-show="!appLoaded"></loading>
                    <table class="table" v-show="appLoaded">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>类型</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_php">
                            <td>{{item.name}}</td>
                            <td>PHP应用</td>
                            <td class="is-icon" title="进入应用">
                            <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_php.length" v-show="appLoaded">
                      您暂时还没有PHP应用...
                    </article>
                    <page :cur.sync="cur_php" :all.sync="all_php" v-on:btn-click="listen_php"></page>
                </tab-item>
                <tab-item title="Node应用">
                    <loading v-show="!appLoaded"></loading>
                    <table class="table" v-show="appLoaded">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>类型</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_nodejs">
                            <td>{{item.name}}</td>
                            <td>Node应用</td>
                            <td class="is-icon" title="进入应用">
                            <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_nodejs.length" v-show="appLoaded">
                      您暂时还没有Node应用...
                    </article>
                    <page :cur.sync="cur_nodejs" :all.sync="all_nodejs" v-on:btn-click="listen_nodejs"></page>
                </tab-item>
                <tab-item title="混合APP">
                    <loading v-show="!appLoaded"></loading>
                    <table class="table" v-show="appLoaded">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>类型</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_hybird">
                            <td>{{item.name}}</td>
                            <td>混合APP</td>
                            <td class="is-icon" title="进入应用">
                            <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_hybird.length" v-show="appLoaded">
                      您暂时还没有混合App应用...
                    </article>
                    <page :cur.sync="cur_hybird" :all.sync="all_hybird" v-on:btn-click="listen_hybird"></page>
                </tab-item>
                <tab-item title="Python应用">
                    <loading v-show="!appLoaded"></loading>
                    <table class="table" v-show="appLoaded">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>类型</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_python">
                            <td>{{item.name}}</td>
                            <td>混合APP</td>
                            <td class="is-icon" title="进入应用">
                            <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_python.length" v-show="appLoaded">
                      您暂时还没有Python应用...
                    </article>
                    <page :cur.sync="cur_python" :all.sync="all_python" v-on:btn-click="listen_python"></page>
                </tab-item>
                <tab-item title="快速部署应用">
                    <loading v-show="!appLoaded"></loading>
                    <table class="table" v-show="appLoaded">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>类型</th>
                          <th>详情</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fields_fast">
                            <td>{{item.name}}</td>
                            <td>快速部署应用</td>
                            <td class="is-icon" title="进入应用">
                                <a  v-link="{path: '/apps/detail',query: {containerId: item.id}}">
                                  <i class="fa fa-share"></i>
                                </a>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <article class="noData" v-if="!fields_fast.length" v-show="appLoaded">
                      您暂时还没有快速部署应用...
                    </article>
                    <page :cur.sync="cur_fast" :all.sync="all_fast" v-on:btn-click="listen_fast"></page>
                </tab-item>
                <tab-item title="数据库">
                    <loading v-show="!databaseLoaded"></loading>

                    <label class="label" v-show="databaseLoaded">添加数据库</label>
                    <p class="control" v-show="databaseLoaded">
                        <button class="button is-success" @click="addDatabase">增加</button>
                    </p>

                    <modal :is-html="true" :is-show.sync="showDatabaseAddingForm">
                        <div slot="header">{{databaseInfoFormName}}</div>
                        <div slot="body">
                            <label class="label">数据库名称</label>
                            <p class="control">
                              <input class="input" type="text" @blur="checkExit" readonly="!isDetailsThisDatabase" placeholder="数据库名称" v-model="db.name">
                            </p>
                          <label class="label">数据库密码</label>
                          <p class="control">
                            <input class="input" type="text" placeholder="数据密码" readonly="!isDetailsThisDatabase"  v-model="db.password">
                          </p>
                           <label class="label">详情</label>
                          <p class="control" v-show="isDetailsThisDatabase">
                            <input class="input" type="text" placeholder="数据密码" readonly="!isDetailsThisDatabase"  v-model="db.description">
                          </p>
                            <p class="label" v-show='!isDetailsThisDatabase'>类型</p>
                            <p class="control has-addons" style="height:32px;" v-show='!isDetailsThisDatabase'>
                              <a :class="['button','database-type-opation',{'is-success': index == thisIndex}]" v-for="(index,item) in databaseType" :disabled="isDetailsThisDatabase" @click="selectThisType(item,index)">
                                <span>{{item.label}}</span>
                              </a>
                            </p>
                        </div>
                        <div slot="footer" v-show='!isDetailsThisDatabase'>
                            <button class="button is-success"
                                @click="confirmAddDatabase">
                            确定
                            </button>
                            <button class="button" @click="hideAddDatabaseForm()">取消</button>
                        </div>
                    </modal>
                    <table class="table" v-show="databaseLoaded">
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
                    <article class="noData" v-if="!fields_db.length" v-show="databaseLoaded">
                      您还没有创建过数据库...
                    </article>
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
                        <label class="label">用户名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      </div>
                      <div class="control is-grouped">
                        <p class="control is-expanded">
                            <input class="input" type="text" value="root" disabled v-model="deployApp.sshAddress">
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
                            <label class="label">用户名</label>
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

                appLoaded: false,
                showDecription: true,

                deployApp: {
                    name: '',
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
                    id: '',
                    size: '',
                    unit: '',
                    products: '',
                    free: '',
                    isCreatedDatabase: false

                },
                showDeployMoal: false,

                edit:{
                  database: ''
                },
                thisIndex: '0',
                databaseType:[{
                  label: 'mysql'
                }, {
                  label: 'mongodb'
                }],
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
                fields_html5: [],
                fields_notpaid: [],
                fields_db: [],
                all_db: 1,
                cur_db: 1,
                cur: 1,
                all: 1,
                cur_stop: 1,
                all_stop: 1,
                all_notpaid: 1,
                cur_notpaid: 1,
                cur_html: 1,
                all_html: 1,

                fields_vd: [],
                all_vd: 1,
                cur_vd: 1,

                fields_php: [],
                all_php: 1,
                cur_php: 1,

                fields_nodejs: [],
                all_nodejs: 1,
                cur_nodejs: 1,

                fields_hybird: [],
                all_hybird: 1,
                cur_hybird: 1,

                fields_python: [],
                all_python: 1,
                cur_python: 1,

                fields_fast: [],
                all_fast: 1,
                cur_fast: 1,


                showPayForm: false,
                qrcode: '',
                alipayUrl: '',
                description: '',
                price: '',
                isWechat: false,
                isAlipay: true,
                orderNo: '',

                appLoaded: false,
                IDEAppLoaded: false,
                databaseLoaded: false,
                unPaidAppLoaded: false
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

            createAppInIDE: function() {
              if(document.domain == 'localhost') {
                window.location.href = "http://localhost:8989";
              }else {
                window.location.href = "http://ide.gospely.com";
              }
            },

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
                this.deployApp.id = item.id;
                this.showDeployMoal = true;
            },

            goToDeployApp() {
                console.log(this.deployApp);
                var _self = this;
                services.Common.create({
                    url: 'applications',
                    param: {
                        id: this.deployApp.id,
                        unitPrice: this.deployApp.unitPrice,
                        price: this.deployApp.total,
                        size: this.deployApp.size,
                        unit: this.deployApp.unit,
                        free: this.deployApp.free,
                        products: this.deployApp.products,
                        sshPassword: this.deployApp.sshPassword,
                    },
                    cb: function(res){

                        var data = res.data;
                        if(data.code == 1) {
                            _self.deployApp.id='';
                            _self.deployApp.unitPrice='';
                            _self.deployApp.total='';
                            _self.deployApp.size='';
                            _self.deployApp.unit='';
                            _self.deployApp.free='';
                            _self.deployApp.products='';
                            _self.deployApp.sshPassword='';
                            _self.$get("init")(1);
                            _self.$get("initStop")(1);
                            _self.$get("initNotpaid")(1);
                            _self.$get("initDb")(1);
                            _self.$get("initHtml")(1);
                        }
                        notification.alert(data.message);
                    }
                });
                this.showDeployMoal = false;
            },

            selectThisDockerConfig: function(dockerConfig, key) {

                this.deployApp.products = dockerConfig.id;
                this.deployApp.free = dockerConfig.free;

                var unit = '';
                if(dockerConfig.memoryUnit == "MB"){
                    unit = 'm'
                }else{
                    unit = 'g'
                }

                this.deployApp.showCaculateResourceSlider = !dockerConfig.free;

                this.deployApp.configIsActive[key].isActive = true;
                if(key === this.deployApp.currentActiveConfig) {
                    this.deployApp.configIsActive[this.currentActiveConfig].isActive = true;
                }else {
                    this.deployApp.configIsActive[this.deployApp.currentActiveConfig].isActive = false;
                }

                this.deployApp.currentActiveConfig = key;
                this.deployApp.unitPrice = dockerConfig.price;
                this.deployApp.price = this.deployApp.unitPrice +"X 1月 = " + this.deployApp.unitPrice;
            },

            DetailsThisDatabase: function(item) {
                this.databaseInfoFormName = '数据库详情';
                console.log(item);
                this.isDetailsThisDatabase = true;
                this.db = item;
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
            listen_html: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initHtml')(data);
            },
            listen_vd: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initVD')(data);
            },
            listen_php: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initPHP')(data);
            },
            listen_nodejs: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initNodejs')(data);
            },
            listen_hybird: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initHybird')(data);
            },
            listen_hybird: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initPython')(data);
            },
            listen_fast: function(data) {
              console.log('你点击了'+data+ '页');
              this.$get('initFast')(data);
            },

            stopThisAPP: function() {

            },
            openApp: function(item) {

                if (window.parent !== window) {
                  parent.postMessage({
                        openApp: item
                  }, '*');
                  return false;
                }
                if(document.domain == 'localhost') {
                  window.open('http://localhost:8989' + "/#/project/" + item.id +"?from=dash");
                }else {
                  window.open('http://ide.gospely.com' + "/#/project/" + item.id +"?from=dash");
                }
            },
            confirmToPay: function() {
              if(this.isAlipay){
                window.location.href = this.alipayUrl;
              }else{
                notification.alert("请确认微信扫码支付完成");
              }
              this.showPayForm = false;
            },

            refreshAppList: function() {
                this.isRefresh = true;
                if (this.currentIndex == 0) {
                  this.$get("init")(1);
                }else if (this.currentIndex == 1) {
                  this.$get("initStop")(1);
                }else if (this.currentIndex == 2) {
                    this.$get("initNotpaid")(1);
                }else {
                    this.$get("initDb")(1);
                }
            },

            init: function(cur) {
                var _self = this;
                _self.IDEAppLoaded = false;
                var options = {
                  param: {
                    limit: 10,
                    cur: cur,
                    status: 1,
                    creator: currentUser
                  },
                  url: "applications",
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields = data.fields;
                    _self.IDEAppLoaded = true;
                    _self.all = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initNotpaid: function(cur) {
                var _self = this;
                _self.unPaidAppLoaded = false;
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
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_notpaid = data.fields;
                    _self.unPaidAppLoaded = true;
                    _self.all_notpaid = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initStop: function(cur) {
                var _self = this;
                _self.appLoaded = false;
                var options = {
                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    status: -1,
                    pay_status: 0,
                    creator: currentUser
                  },
                  target: 'fields_stop',
                  all: 'all_stop',
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_stop = data.fields;
                    _self.appLoaded = true;
                    _self.all_stop = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initHtml: function(cur) {
                var _self = this;
                _self.appLoaded = false;
                var options = {
                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    parent: 'html:latest',
                    pay_status: 0,
                    creator: currentUser
                  },
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_html5 = data.fields;
                    _self.appLoaded = true;
                    _self.all_html = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initVD(cur){
                var _self = this;
                _self.appLoaded = false;
                var options = {
                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    parent: 'vd:latest',
                    pay_status: 0,
                    creator: currentUser
                  },
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_vd = data.fields;
                    _self.appLoaded = true;
                    _self.all_vd = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initPHP(cur) {
                var _self = this;
                _self.appLoaded = false;
                var options = {
                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    parent: 'php:latest',
                    pay_status: 0,
                    creator: currentUser
                  },
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_php = data.fields;
                    _self.appLoaded = true;
                    _self.all_php = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initNodejs(cur) {
                var _self = this;
                _self.appLoaded = false;
                var options = {
                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    parent: 'nodejs:latest',
                    pay_status: 0,
                    creator: currentUser
                  },
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_nodejs = data.fields;
                    _self.appLoaded = true;
                    _self.all_nodejs = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initHybird(cur) {
                var _self = this;
                _self.appLoaded = false;
                var options = {
                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    parent: 'hybridapp:latest',
                    pay_status: 0,
                    creator: currentUser
                  },
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_hybird = data.fields;
                    _self.appLoaded = true;
                    _self.all_hybird = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initPython(cur) {

                var _self = this;
                _self.appLoaded = false;
                var options = {
                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    parent: 'python:latest',
                    pay_status: 0,
                    creator: currentUser
                  },
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_python = data.fields;
                    _self.appLoaded = true;
                    _self.all_python = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initFast(cur){

                var _self = this;
                _self.appLoaded = false;
                var options = {
                  url: "applications",
                  param: {
                    limit: 10,
                    cur: cur,
                    type: 'deployfast',
                    creator: currentUser
                  },
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_fast = data.fields;
                    _self.appLoaded = true;
                    _self.all_fast = data.all;
                    _self.refresh();
                  }
                }

                services.Common.list(options);
            },
            initDb: function(cur) {

                var _self = this;
                _self.databaseLoaded = false;
                var options = {
                  url: "dbs",
                  param: {
                    limit: 10,
                    cur: cur,
                    creator: currentUser
                  },
                  target: 'fields_db',
                  all: 'all_db',
                  ctx: _self,
                  cb: function(res) {
                    var data = res.data;
                    _self.fields_db = data.fields;
                    _self.databaseLoaded = true;
                    _self.refresh();
                  }
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
                          _self.deployApp.products = data.fields[i].id;
                          _self.deployApp.free = true;
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

            refresh: function () {
                if (this.isRefresh) {
                  notification.alert("刷新成功");
                  this.unPaidAppLoaded = true;
                  console.log(localStorage)
                }
                this.isRefresh = false;
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
                    console.log(data.fields);
                    _self.price =  data.fields.price;
                    _self.qrcode = data.fields.wechat;
                    localStorage.orderNo = data.fields.orderNo;
                    _self.alipayUrl= data.fields.alipay;
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
            this.$get("initHtml")(1);
            this.$get("initVD")(1);
            this.$get("initPHP")(1);
            this.$get("initNodejs")(1);
            this.$get("initHybird")(1);
            this.$get("initPython")(1);
            this.$get("initFast")(1);
            this.$set("application", this.$route.query.containerId);
            this.$get('initDockerConfig')();
        },
        events:{
          'selected':function (index) {
            this.currentIndex = index;
          },

          'weixin': function() {

            console.log("wechat");
            if(!window.timerId){
                window.timerId = window.setInterval(function(){
                    console.log("check");
                    services.Common.list({
                        url: 'orders',
                        param: {
                            orderNo:  localStorage.orderNo,
                            status: 2
                        },
                        cb: function(res){
                            if(res.data.fields.length == 1){
                                window.clearInterval(window.timerId);
                                window.timerId = null;
                                notification.alert("支付成功");
                                window.location.href = window.location.origin + '/#!/accounts/orders?code=pay'
                            }
                        }
                    });
                },1000);
            }
            this.isWechat = true;
            this.isAlipay = false;
          },

          'alipay': function() {
            this.isWechat = false;
            this.isAlipay = true;
          },

          'cycSelected': function(cyc) {
                this.deployApp.total = cyc.cyc * this.deployApp.unitPrice;
                this.deployApp.size = cyc.cyc;
                this.deployApp.unit = cyc.unit;
                this.deployApp.price = this.deployApp.unitPrice + " X " + cyc.cyc + " " + cyc.unit + " = " + this.deployApp.total;
                console.log(cyc);
            },
        }
    }
</script>
