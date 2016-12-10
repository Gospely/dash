<template>
    <div class="container">
        <h1 class="title">创建应用</h1>
        <h2 class="subtitle">您可以在这里创建基于<strong>dodora容器云</strong>，并使用Gospel集成开发环境进行开发的应用</h2>
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
                    <input class="input" type="text" placeholder="给您的应用取个名字吧" v-model="application.name">
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">容器配置</label>
              </div>
              <div class="control is-grouped">

                <div class="columns" style="margin-left: 82px;">

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
                <label class="label">用户名称</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" value="root" disabled v-model="application.username">
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">用户密码</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="password" v-model="application.password">
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
                    <button style="margin-top:6px" class="button is-primary" v-bind:class="{'is-loading': isCreateApp}" @click="createApp">立即创建</button>
                </p>
              </div>
            </div>

            <hr>

        </div>

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

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                application:{
                    name: '',
                    image: '',
                    volume: '',
                    username: 'root',
                    password: '',
                    imageName: '',
                    size: '',
                    unit: '',
                    price: '',
                    unitPrice: '',
                    products: ''
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
                withImage: false,
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

                showServices:false,

                selectName: '',
                selectDescription: '',
                versions:[
                ],
                showVersionModal:false
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
            VersionModal
        },

        methods: {

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

                this.application.products = dockerConfig.id;
                this.application.image = dockerConfig.id;
                this.application.free = dockerConfig.free;

                var unit = '';
                if(dockerConfig.memoryUnit == "MB"){
                    unit = 'm'
                }else{
                    unit = 'g'
                }
                this.application.memory = dockerConfig.memory + unit;
                this.showCaculateResourceSlider = !dockerConfig.free;

                this.configIsActive[key].isActive = true;
                if(key === this.currentActiveConfig) {
                    this.configIsActive[this.currentActiveConfig].isActive = true;
                }else {
                    this.configIsActive[this.currentActiveConfig].isActive = false;
                }

                this.currentActiveConfig = key;
                this.unitPrice = dockerConfig.price;
                this.application.unitPrice = dockerConfig.price;

                this.total = this.unitPrice;
                this.price = this.unitPrice +"X 1月 = "+this.unitPrice;


            },
            selectVolume: function(volume,key){
                console.log(this.currentVolume);
                console.log("111");
                this.application.volume = volume.id
                this.volumeIsActive[key].isActive = true;
                if(key === this.curentVolume) {
                    this.volumeIsActive[this.currentVolume].isActive = true;
                }else {
                    this.volumeIsActive[this.currentVolume].isActive = false;
                }
                this.currentVolume = key;
            },

            realCreateApp: function() {
                var _self = this;
                _self.application.userName = currentUserName;

                if(!_self.application.free) {

                  _self.application.price = _self.application.size * this.unitPrice;
                }

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
                        }
                    },

                };
                services.Common.create(options);
                this.isCreateApp = true;
            },
            reload: function() {

              console.log("reload ");
              this.application = null;
              this.isCreateApp = false;
            },

            confirmPayToCreateApp: function() {
                this.isCreateApp = true;
                this.realCreateApp();
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
            // this.$get('initVolumes')();
        },
        events: {
            'imageOnSelected': function(item) {

                var _self = this;
                console.log("select" + item.id);
                this.showImageSelectorForm = false;
                this.showVersionModal = true;
                this.selectName = item.name;
                this.selectDescription = item.description;
                this.imageId = item.id;
                this.application.image = item.name;
                this.imageName = item.name;

                services.Common.list({
                  url: 'images',
                  param: {
                    parent: item.id
                  },
                  target: 'versions',
                  ctx: _self
                });
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
                console.log(cyc);
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
