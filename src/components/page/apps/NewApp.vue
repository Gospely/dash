<template>
    <div class="container">
        <h1 class="title">快速部署</h1>
        <h2 class="subtitle">您可以在这里快速部署应用，并使用Gospel集成开发环境进行开发</h2>
        <hr>
        <div class="content">
            <!-- <modal :is-html="true" :width="800" :is-show.sync="showImageSelectorForm">
                <div slot="header">选择镜像</div>
                <div slot="body">

                </div>
                <div slot="footer">
                </div>
            </modal> -->

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">应用名称</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input @keyup.enter="createApp" class="input" type="text" @blur="checkExit" placeholder="给您的应用取个名字吧" v-model="application.name">
                </p>
              </div>
            </div>
            <hr>
            <div class="control is-horizontal user-center ">
              <div class="control-label">
                <label class="label">二级域名</label>
              </div>
              <div class="control is-grouped has-addons">
                <p class="control is-expanded">
                    <input style="width:100%" @keyup.enter="createApp" class="input" type="text" @blur="checkDomainExit" placeholder="自定义域名" v-model="application.domain">
                </p>
                  <p class="control">
                    <a class="button">
                     .gospel.design
                    </a>
                  </p>
              </div>
            </div>
            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">容器配置</label>
              </div>
              <div class="control is-grouped">
                <div class="columns" style="margin-left: 82px;"  v-show="dockerConfigLoaded">

                    <div class="column" v-for="(key, val) in dockerConfigs">
                        <div v-bind:class="['docker-config-box',{'active': configIsActive[key].isActive}]" @click="selectThisDockerConfig(val, key)">
                            <ul class="text-center parameter">
                                <li>{{val.memory}} 内存</li>
                                {{val.cpu}} CPU{{val.cpuType}}
                            </ul>
                            <div class="down-style">{{val.name}}</div>
                        </div>
                    </div>

                </div>

                <loading v-show="!dockerConfigLoaded"></loading>

              </div>
            </div>

            <hr v-show="showCaculateResourceSlider">

            <div v-show="showCaculateResourceSlider" class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">使用时长</label>
              </div>
              <div class="control is-grouped" style="margin-left:30px">
                <div class="columns">
                    <div class="column">
                       <cyc :price.sync="price"></cyc>
                    </div>
                </div>
              </div>
            </div>
		    <hr>
            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">容器镜像</label>
              </div>
              <div class="control is-grouped" style="margin-left:-20px">
                <p class="control is-expanded">
                    <a class="button is-primary" v-show="!withImage" @click="selectImage">选择镜像</a>
                    <span class="help" v-show="withImage">已选镜像：{{imageId}}</span>
                    <a style="margin-top:6px" class="button is-primary" v-show="withImage" @click="selectImage">重新选择</a>
                </p>
              </div>
            </div>

            <div class="control is-horizontal user-center" style="padding-left: 19.322034%;" v-show="showServices">
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <image-viewer></image-viewer>
                </p>
              </div>
            </div>

            <version-modal :versions="versions" :show-version-modal.sync="showVersionModal" :select-name="selectName" :select-description="selectDescription"></version-modal>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">ssh用户</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input class="input" @keyup.enter="createApp" type="text" value="root" disabled v-model="application.username">
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">ssh密码</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input class="input" @keyup.enter="createApp" type="password" v-model="application.sshPassword">
                </p>
              </div>
            </div>

            <hr v-show="application.isCreatedDatabase">

            <a @click="openHelp">为什么需要数据库信息？</a>

            <div class="control is-horizontal user-center" v-show="application.isCreatedDatabase">
                <div class="control-label">
                    <label class="label">数据库用户</label>
                </div>
                <div class="control is-grouped">
                    <p class="control is-expanded">
                        <input class="input" @keyup.enter="createApp" type="text" @blur="checkDbName" placeholder="用户名即数据库名称" v-model="application.dbUser">
                    </p>
                </div>
            </div>

            <hr v-show="application.isCreatedDatabase">
            <div class="control is-horizontal user-center" v-show="application.isCreatedDatabase">
                <div class="control-label">
                    <label class="label">数据库密码</label>
                </div>
                <div class="control is-grouped">
                    <p class="control is-expanded">
                        <input class="input" @keyup.enter="createApp" type="password" placeholder="数据库密码" v-model="application.password">
                    </p>
                </div>
            </div>

            <hr v-show="application.isCreatedDatabase">
            <div class="control is-horizontal user-center" v-show="application.isCreatedDatabase">
                <div class="control-label" style="margin-right:10px">
                    <p class="label">数据库类型&nbsp;&nbsp;</p>
                </div>
                <div class="control is-grouped">
                    <p class="control has-addons" style="height:32px;width:100%">
                        <a v-show="item.label != 'postgres'" :disabled="item.available" :class="['button','database-type-opation',{'is-primary': index == thisIndex}]" v-for="(index,item) in databaseType" :disabled="isDetailsThisDatabase" @click="selectThisType(item,index)">
                          <span>{{item.label}}</span>
                        </a>
                    </p>
                </div>
            </div>

<!--             <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">状态服务</label>
              </div>
              <div class="control is-grouped" style="margin-left:13px">
                <p class="control is-expanded">
                    <input type="checkbox" v-model="isHaul">
                    有状态服务

                    <span class="help">Dodora容器云会帮您自动生成HTTP和SSH端口</span>
                </p>
              </div>
            </div>

            <hr v-show="isHaul">

            <div v-show="isHaul" class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">选择数据卷</label>
              </div>
              <div class="control is-grouped" style="margin-left:-33px">

                <div class="column" style="margin-left:0px"  v-for="(key, val) in volumes">
                    <div v-bind:class="{'active': volumeIsActive[key].isActive}"  @click="selectVolume(val, key)">
                        <ul class="text-center parameter">
                            <li><i style="font-size:20px" class="fa fa-database" aria-hidden="true"></i></li>
                        </ul>
                        <div class="down-style" style="padding-left:5px;padding-right:5px">{{val.name}}</div>
                    </div>
                </div>

              </div>
            </div> -->
<!--  -->
            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">开始创建</label>
              </div>
              <div class="control is-grouped" style="margin-left:-20px">
                <p class="control is-expanded">
                    <button style="margin-top:6px" class="button is-primary" :disabled='available' v-bind:class="{'is-loading': isCreateApp}" @click="createApp">立即创建</button>
                </p>
              </div>
            </div>

            <hr>

        </div>
        <new-loading v-show="isCreateApp" tip="部署中..."></new-loading>
    </div>
</template>
<style>

    .loading-shade {
        position: absolute;
        height: 100%;
        top: 50%;
        width: 100%;
        z-index: 65535;
    }

    .show-services{
        display:none;
    }

</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'
    import ImageViewer from './ImageViewer.vue'
    import Slider from 'vue-bulma-slider'
    import Cyc from '../../ui/Cyc.vue'

    import Details from './Details.vue'

    import PayMethod from '../../ui/PayMethod.vue';
    import VersionModal from '../../ui/ChooseServicesVersion.vue'

    import NewLoading from '../../ui/Loading.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                showDatabaseAddingForm: false,
                isDetailsThisDatabase: false,
                databaseInfoFormName: '新增数据库',
                thisIndex: '0',
                available: false,
                databaseType:[
                    {
                      label: 'mysql',
                      available: false
                    },
                    {
                      label: 'postgres',
                      available: false
                    },
                    {
                      label: 'mongodb',
                      available: false
                    }
                ],
                application:{
                    name: '',
                    image: '',
                    volume: '',
                    username: 'root',
                    dbUser: localStorage.userName,
                    sshPassword: '',
                    password: '',
                    imageName: '',
                    size: '',
                    unit: '',
                    price: '',
                    unitPrice: '',
                    products: '',
                    git:'',
                    databaseType: 'mysql',
                    isCreatedDatabase: true,
                    domain:'',
                },

                price: '10 X 100 = 1000',
                unitPrice: 0,
                unitPrice: '10',
                total: 0,
                products: '',
                size: 1,
                qrcode: '' ,

                volumes: [],
                isCreateApp: false,
                withImage: true,
                imageId: null,
                showImageSelectorForm: false,

                showCaculateResourceSlider: false,
                volumeIsActive: [],
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
                currentVolume: '',

                dockerConfigs: [],

                isHaul: false,

                imageName: 'null',

                showServices:true,

                selectName: '',
                selectDescription: '',
                versions:[
                ],
                showVersionModal: false,

                dockerConfigLoaded: false
            }
        },

        created () {

            if(typeof this.$route.query.imageId != 'undefined') {
                this.$set('withImage', true);
                this.$set('imageId', this.$route.query.imageId);

                try {
                    var currentImage = JSON.parse(sessionStorage.currentImage);
                    this.$set('imageId', currentImage.id);
                }catch(error) {
                    notification.alert('镜像丢失，请重新选择镜像', 'warning');
                }

                sessionStorage.currentImage = '';
            }

        },

        components: {
            Modal,
            ImageViewer,
            Slider,
            Cyc,
            PayMethod,
            Details,
            VersionModal,
            NewLoading
        },

        methods: {

            openHelp() {

                new ModalCtrl({
                    el: document.createElement('div'),
                    props: {
                        isShow: false,
                        header: {
                            default: '为什么需要数据库信息？'
                        },
                        body: {
                            default: 'Gospel会将您的数据库用户名作为数据库表，在安装wordpress、discuz!或其它Web应用时您需要提供这里录入的数据库信息'
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

            selectThisType(item,index){
              this.thisIndex = index;
              this.application.databaseType =  item.label;
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
            genQrcode: function() {

              var _self = this;
              this.showRenewForm = true;
              services.OrderService.order({
                products: this.products,
                price: this.size * this.unitPrice,
                size: this.size,
                unitPrice: this.unitPrice,
                type: 'wechat'
              }).then(function(res){
                  console.log(res);
                  _self.qrcode = res.data.code_url;
                  //window.location.href = res.body;
              },function(err,res){

              });
          },

            hideImageSelectorForm: function() {
                this.showImageSelectorForm = false;
            },

            selectImage: function() {
                this.showImageSelectorForm = true;
                this.showServices = true;
                // alert(this.showServices)
            },

            selectThisDockerConfig: function(dockerConfig, key) {

                notification.alert("内测期间，暂不提供该配置");
                // this.application.products = dockerConfig.id;
                // this.application.image = dockerConfig.id;
                // this.application.free = dockerConfig.free;
                //
                // var unit = '';
                // if(dockerConfig.memoryUnit == "MB"){
                //     unit = 'm'
                // }else{
                //     unit = 'g'
                // }
                // this.application.memory = dockerConfig.memory + unit;
                // this.showCaculateResourceSlider = !dockerConfig.free;
                //
                // this.configIsActive[key].isActive = true;
                // if(key === this.currentActiveConfig) {
                //     this.configIsActive[this.currentActiveConfig].isActive = true;
                // }else {
                //     this.configIsActive[this.currentActiveConfig].isActive = false;
                // }
                //
                // this.currentActiveConfig = key;
                // this.unitPrice = dockerConfig.price;
                // this.application.unitPrice = dockerConfig.price;
                //
                // this.total = this.unitPrice;
                // this.price = this.unitPrice +"X 1月 = "+this.unitPrice;


            },
            selectVolume: function(volume,key){

                this.application.volume = volume.id
                this.volumeIsActive[key].isActive = true;
                if(key === this.curentVolume) {
                    this.volumeIsActive[this.currentVolume].isActive = true;
                }else {
                    this.volumeIsActive[this.currentVolume].isActive = false;
                }
                this.currentVolume = key;
            },
            checkDomainExit: function(){

                var _self = this;

                const illegalLetter = ['!',' ', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']',
                                    '{', '}', '\\', '|', ':', ';', '\'', '"', '<', '>', ',', '.', '/', '?'];
                var theCurrentLetter = this.application.domain.split('');
                for (var i = 0; i < theCurrentLetter.length; i++) {

                    if(illegalLetter.indexOf(theCurrentLetter[i]) !== -1) {
                        notification.alert('请勿输入非法字符: \' ' + theCurrentLetter[i] + ' \'', 'warning')
                        self.application.domain = '';
                        return false;
                    }
                }
                services.Common.list({
                    url: 'domains',
                    param: {
                        subDomain: this.application.domain
                    },
                    cb: function(res) {
                        if(res.data.fields.length > 0){
                            notification.alert('域名已占用');
                            _self.application.domain = '';
                        }
                    }
                })

            },
            checkExit: function(){

                var _self = this;

                const illegalLetter = ['!',' ', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']',
									'{', '}', '\\', '|', ':', ';', '\'', '"', '<', '>', ',', '.', '/', '?'];
				var theCurrentLetter = this.application.name.split('');
                for (var i = 0; i < theCurrentLetter.length; i++) {

                    if(illegalLetter.indexOf(theCurrentLetter[i]) !== -1) {
                        notification.alert('请勿输入非法字符: \' ' + theCurrentLetter[i] + ' \'', 'warning')
                        self.application.name = '';
    					return false;
    				}
                }

                services.Common.list({
                    url:'applications/validator',
                    param: {
                        creator: currentUser,
                        name: this.application.name,
                        userName: localStorage.userName
                    },
                    cb: function(res){
                        var data = res.data;
                        if(data.code == -1) {
                            notification.alert(data.message);
                            _self.application.name = '';
                        }
                    }
                });
            },
            realCreateApp: function() {
                var _self = this;
                _self.application.userName = currentUserName;

                if(!_self.application.free) {

                  _self.application.price = _self.application.size * this.unitPrice;
                }
                this.application.deploy = true;
                var options = {

                    param: this.application,
                    url: "applications",

                    msg: {
                      success: "新建应用成功",
                      failed : "新建应用失败",
                    },
                    ctx: _self,
                    cb: function(res) {

                        if(res.status == 200) {
                            var data = res.data;
                            notification.alert(data.message);
                            if(data.code == 1) {

                                var activeDockerConfig = _self.dockerConfigs[_self.currentActiveConfig];

                                if(!activeDockerConfig.free) {
                                    notification.alert('您当前创建的是付费应用，创建完成后不会启动，请到[我的应用 - 未支付]处完成支付操作', 'warning');
                                    _self.$router.replace('/apps/list/');
                                }else {
                                    var message = {
                                      'finishAppCreate': data.fields.id
                                    }
                                    console.log("======data======");
                                    console.log(window.parent);
                                    window.parent.postMessage(message,'*');
                                    _self.$router.replace('/apps/detail/?containerId=' + data.fields.id);
                                }
                            }else{
                                _self.$get("reload")();
                                notification.alert(data.message,'danger');
                            }

                        }else {
                            notification.alert('创建失败: ' + res.statusText);
                            _self.$get("reload")();
                            _self.isCreateApp = false;
                        }
                    },

                };
                services.Common.create(options);
                this.isCreateApp = true;
            },
            reload: function() {

              console.log("reload ");
              this.isCreateApp = false;
            },

            confirmPayToCreateApp: function() {
                this.isCreateApp = true;
                this.realCreateApp();
            },
            checkDbName: function(){
                console.log('checkDbName');
                if(!/^[a-z]*$/.test(this.application.dbUser)){
                    notification.alert('数据库用户名只支持小写英文名', 'warning');
                    this.application.dbUser = '';
                }
            },
            createApp: function() {

                this.application.image = this.imageId;
                this.application.creator = currentUser;

                if(
                    this.application.name == '' ||
                    this.application.image == '' ||
                    this.application.image == null ||
                    this.application.username == '' ||
                    this.application.password == '' ||
                    this.application.imageName == this.application.name
                ) {
                    notification.alert('请完整填写内容', 'warning');
                    return false;
                }


                this.realCreateApp();
            },

            toggleVolumesList: function() {

            },
            initConfig: function() {

                var _self =  this;

                _self.dockerConfigLoaded = false;

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
                          _self.currentActiveConfig = i;
                          _self.application.products = data.fields[i].id;
                        }
                    }
                    _self.dockerConfigs = data.fields;
                    _self.configIsActive = arr;
                    _self.dockerConfigLoaded = true;
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
            initVolumes: function() {

                var _self =  this;
                function callback(res){

                    console.log("callback");
                    var data = res.data;
                    var arr = new Array();

                    for(var i=0; i<data.fields.length; i++){
                      arr.push({
                          isActive: false
                      });
                    }

                    if(data.fields.length > 0) {
                        _self.currentVolume = data.fields[0].id
                        _self.volumes = data.fields;
                        _self.volumeIsActive = arr;
                    }
                }
                var options = {
                  url: "volumes",
                  ctx: _self,
                  cb: callback,
                  param: {
                    creator: currentUser
                  }
                }
                services.Common.list(options);
            },
            confirmRenew: function(){
                console.log("pay");
                this.genQrcode();
                services.OrderService.order({
                  products: this.products,
                  price: this.size * this.unitPrice,
                  size: this.size,
                  unitPrice: this.unitPrice
                }).then(function(res){
                    console.log(res);
                    window.location.href = res.body;
                },function(err,res){

                });
            }

        },
        ready: function() {

            this.application.free = true;
            this.$get('initConfig')();
            var _self = this;
            services.Common.list({
                url: 'applications',
                param: {
                    creator: currentUser,
                    type: 'application'
                },
                cb: function(res){
                    var data = res.data;
                    if(data.code == 1){
                        if(data.fields.length >= 1){
                            _self.available = true;
                            notification.alert('快速部署应用目前对内测用户只提供1个创建权限');
                        }
                    }else{
                        _self.available = false;
                    }
                }
            });
            this.$get('initVolumes')();
        },
        watch:{

            'application.domain': function(val, oldVal){
                console.log(val);

                var illegalLetter = ['!',' ', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']',
									'{', '}', '\\', '|', ':', ';', '\'', '"', '<', '>', ',', '.', '/', '?'];
				var theCurrentLetter = val.replace(oldVal, '');
                if(illegalLetter.indexOf(theCurrentLetter) !== -1) {
                    notification.alert('请勿输入非法字符: \' ' + theCurrentLetter + ' \'', 'warning')
                    return false;
                }

                var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                if(reg.test(val)){
                  notification.alert("域名不能包含中文");
                }
            }
        },
        events: {
            'imageOnSelected': function(item) {

                var _self = this;
                this.showImageSelectorForm = false;
                this.selectName = item.name;
                this.selectDescription = item.description;
                this.imageId = item.id;
                this.application.image = item.name;
                this.imageName = item.name;

                if(item.parent = 'php:latest'){
                    this.databaseType = [
                        {
                          label: 'mysql',
                          available: false
                        },
                        {
                          label: 'mongodb',
                          available: true
                        },
                    ];
                }
                // services.Common.list({
                //   url: 'images',
                //   param: {
                //     parent: item.id
                //   },
                //   target: 'versions',
                //   ctx: _self
                // });
                // this.showVersionModal = true;
                this.withImage = true;
                this.showVersionModal = false;
                this.showServices = false;
            },
            'selectThisVersion': function(item) {
                console.log(item.id);
                this.imageId = item.id;
                this.image = item.id;
                this.imageName = item.name + ":" +item.label;
            },

            'cycSelected': function(cyc) {
                this.total = cyc.cyc * this.unitPrice;
                this.size = cyc.cyc;
                this.application.size = cyc.cyc;
                this.application.unit = cyc.unit;
                this.price = this.unitPrice +" X "+ cyc.cyc+" "+cyc.unit +" = "+this.total;
            },
            comfirmVersion() {
                // this.$router.go('/apps/new/' + this.selectName);
                this.withImage = true;
                this.showVersionModal = false;
                this.showServices = false;
            }
        }

    }
</script>
