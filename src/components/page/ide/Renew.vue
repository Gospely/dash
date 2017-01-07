<template>
    <div class="container">
        <h1 class="title">Gospel集成开发环境</h1>
        <h2 class="subtitle"><a href="http://ide.gospely.com">访问<strong>Gospel集成开发环境</strong></a></h2>
        <hr>
        <div class="content" v-show="ideInfoLoaded">

            <modal :is-html="true" :is-show.sync="showSetMealForm">
                <div slot="header">{{modalHeader[setMeal.currentStep - 1]}}</div>
                <div slot="body">

                    <div v-show="setMeal.currentStep == 1" class="step1">
                        <span class="help is-tip">您当前的版本为：{{ide.name}}</span>

                        <hr class="split">

                        <article class="message" @click="chooseIde(item, key)" v-for="(key, item) in fields"  >
                            <div class="message-body">
                                <div class="message-title">
                                    <h4>{{item.name}}</h4>
                                    <div class="meal-set-right">
                                        <a class="button is-small" v-bind:class="{'is-success': item.active}"><i class="fa fa-check"></i></a>
                                    </div>
                                    <hr class="split">
                                </div>
                                {{item.description}}
                                {{item.price}}元/月
                            </div>
                        </article>

                    </div>

                    <div v-show="setMeal.currentStep == 2" class="step2">

                        <span class="help is-tip">到期时间：{{time_show}}</span>
                        <span class="help is-tip" v-show="isChange">差额补价时长：{{balanceTime}}</span>
                        <span class="help is-tip" v-show="isChange">差额补价：{{balance}} 元</span>

                        <!-- <hr class="split"> -->

                        <!-- <article class="media">
                            <div class="media-left">
                              <figure class="image is-64x64">
                                <span class="icon is-big" style="font-size:50px;height:64px;width:64px;line-height:1;">
                                  <i class="fa fa-star"></i>
                                </span>
                              </figure>
                            </div>
                            <div class="media-content">
                              <div class="content">
                                <p>
                                  <strong>{{ide_choose}}</strong>
                                </p>
                                <div class="media-right">
                                    {{unitPrice}} 元/月
                                </div>

                              </div>
                            </div>
                        </article> -->

                        <hr class="split">

                        <article class="media">
                            <div class="media-left">
                              <figure class="image is-64x64">
                                <span class="icon is-big" style="font-size:50px;height:64px;width:64px;line-height:1;">
                                  <i class="fa fa-star"></i>
                                </span>
                              </figure>
                            </div>
                            <div class="media-content">
                              <div class="content">
                                <p>
                                  <strong>{{ide_choose}}</strong>
                                </p>
                                <div class="media-right">
                                    {{unitPrice}} 元/月
                                </div>

                              </div>
                            </div>
                        </article>

                        <hr class="split">

                        <div class="control" style="position: relative;">
                          <cyc :current-cyc="defaultCycIndex" :show-tips="false" :other-time="size" :show-cyc.sync='showCyc'></cyc>
                          <div class="control" style="position: absolute;top: 0;left:390px;">
                            <button class="button is-primary" @click="minusMonth"><i class="fa fa-minus"></i></button>
                            <button class="button is-primary" @click="addMonth"><i class="fa fa-plus"></i></button>
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
                        <!-- <pay-method :val.sync="qrcode"></pay-method> -->

                    </div>

                    <div v-show="setMeal.currentStep == 3" class="step3">

                        <article class="media">
                            <div class="media-left">
                              <figure class="image is-64x64">
                                <span class="icon is-big" style="font-size:50px;height:64px;width:64px;line-height:1;">
                                  <i class="fa fa-star"></i>
                                </span>
                              </figure>
                            </div>
                            <div class="media-content">
                              <div class="content">
                                <p>
                                  <strong>{{ide_choose}}</strong>
                                </p>
                                <div class="media-right">
                                    {{unitPrice}} 元/月
                                </div>

                              </div>
                            </div>
                        </article>

                        <hr class="split">

                        <span>到期时间：</span>
                        <span class="media-span-right">
                            {{time_show}}
                        </span>

                        <hr class="split">

                        <!-- <p class="control">
                          <cyc :show-tips="false"></cyc>
                        </p> -->
                        <span>合计：</span>
                        <span class="media-span-right">{{price}} 元</span>
                        <hr class="split">
                        <pay-method :val.sync="qrcode"></pay-method>

                    </div>

                </div>

                <div slot="footer">
                    <button v-show="setMeal.currentStep != 1" class="button is-success"
                        @click="setMealPrevStep">
                    上一步
                    </button>

                    <button v-show="setMeal.currentStep == 1" class="button is-success"
                        @click="setMealNextStep">
                    下一步
                    </button>

                    <button v-show="setMeal.currentStep == 2" class="button is-success"
                        @click="setMealNextStep">
                    提交订单
                    </button>

                    <button v-show="setMeal.currentStep == setMeal.totalStep && isAlipay" class="button is-primary"
                        @click="chooseSetMeal">
                    确认支付
                    </button>

                    <button class="button" @click="showSetMealForm = false">取消</button>
                </div>
            </modal>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">当前IDE版本</label>
              </div>
              <div class="control">

                <div class="card set-meal">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image" style="width:30px;height:30px">
                            <span class="icon is-big" style="font-size:30px;height:100%;width:30px;line-height:1">
                              <i class="fa fa-star"></i>
                            </span>
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-5" style="margin-bottom:7px">{{ide.name}}</p>
                        <p class="subtitle is-6" style="margin-top:0px" v-show = "isFree" >免费</p>
                        <div class="text-right">
                            <a @click="visitIDE" class="button is-small is-primary">访问</a>
                            <a @click="changeSetMeal" class="button is-small is-warning">升级</a>
                        </div>
                      </div>
                    </div>

                    <div class="content">
                        已创建 {{applicationsCount}} 个项目
                      <br>
                      <small>到期时间：{{time_show}}</small>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <hr>
        </div>
        <loading v-show="!ideInfoLoaded"></loading>
    </div>
</template>
<style>

    .set-meal {
        box-shadow: none;
        border: 1px solid #d3d6db;
    }

    .text-right {
        right: 20px;
        top: 20px;
        position: absolute;
    }

    .meal-set-right {
        text-align: right;
        margin-top: -38px;
    }

    .media-right {
        text-align: right;
    }

    .media-span-right {
        display: inline-block;
        width: 100%;
        text-align: right;
    }

</style>
<script>

    import {Tab, TabItem} from '../../ui/Tab'
    import IdeState from './IDEState'
    import Modal from '../../ui/Modal/Modal.vue'

    import Slider from 'vue-bulma-slider'
    import Cyc from '../../ui/Cyc.vue'

    import PayMethod from '../../ui/PayMethod.vue'
    import uuid from 'node-uuid'
    import _md5 from 'md5'

    function dataFormat(date,fmt){ //author: meizz
       var o = {
         "M+" : date.getMonth()+1,                 //月份
         "d+" : date.getDate(),                    //日
         "h+" : date.getHours(),                   //小时
         "m+" : date.getMinutes(),                 //分
         "s+" : date.getSeconds(),                 //秒
         "q+" : Math.floor((date.getMonth()+3)/3), //季度
         "S"  : date.getMilliseconds()             //毫秒
       };
       if(/(y+)/.test(fmt))
         fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
       for(var k in o)
         if(new RegExp("("+ k +")").test(fmt))
       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
       return fmt;
   }

    export default{
        data () {
            return {
                modalHeader: ['选择版本','选择时间','确认订购'],
                isRefresh: false,
                showRenewForm: false,

                isOther: false,
                otherTime: '其它',

                ide: '',
                price: 0,
                unitPrice: 0,
                size: 1,
                orderNo: '',
                products: '',
                balance: 0,
                balancePeriod: '',
                balanceTime: '',
                isChange: false, //是否选择与当前版本一样的版本
                oldVersion: '', //ide原版本,
                showCyc: true,
                volume: {
                  size: 20
                },

                isWeixin: false,
                isFree: false,
                qrcode: 'http://www.gospely.com',
                alipay: '',
                currentIDE: localStorage.getItem('ide'),
                fields: [],
                applicationsCount: '',
                expireAt: '',
                ide_choose: '',
                showTopupForm: false,
                showSetMealForm: false,

                isWechat: false,
                isAlipay: true,
                goBuy: true,
                setMeal: {
                    totalStep: 3,
                    currentStep: 1
                },

                mealTicks: [],
                time_show: '',

                ideInfoLoaded: false,

                defaultCycIndex: 0

            }
        },
        components: {
            Tab,
            TabItem,
            IdeState,
            Modal,
            Slider,
            Cyc,
            PayMethod
        },

        methods: {

            visitIDE: function() {
              window.location.href = "http://ide.gospely.com";
            },

            confirmRenew: function() {
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
            },
            confirmRenewIDEVolume: function() {

            },
            chooseIde: function(item, key) {

              this.products = item.id;
              if(this.ide.name != item.name){
                this.isChange = true;
                var _self = this;
                if(_self.isChange){
                  //计算差额
                  var month = 0;
                  _self.balance = 0;
                  _self.balanceTime = "无";
                  if(_self.expireAt != null && _self.expireAt != undefined) {

                    month = daysBetween(dataFormat(new Date(),'yyyy-MM-dd hh:mm:ss'), dataFormat(new Date(_self.expireAt),'yyyy-MM-dd hh:mm:ss'));
                    month = month.toFixed(2);
                    services.Common.getOne({
                      param: {
                        id: _self.oldVersion
                      },
                      url: "products",
                      cb: function(res) {

                        var data = res.data;

                        if(data.code == 1) {

                          _self.balance = month * data.fields.price,
                          _self.balance = _self.balance.toFixed(2);
                          _self.balanceTime = month + '月 X ' + data.fields.price
                          var time = Math.ceil(_self.balance/item.price);
                          if(time>12) {
                            _self.showCyc = false;
                            _self.$broadcast('cyc-broadcast',time);
                          }else{
                            if(time<=1) {
                                _self.defaultCycIndex = 0;
                            }else{
                                if(time<= 3){
                                    _self.defaultCycIndex = 1;
                                }else{
                                    if(time<=6){
                                        _self.defaultCycIndex = 2;
                                    }else{
                                        if(time <=12){
                                            _self.defaultCycIndex = 3;
                                        }
                                    }
                                }
                            }
                            _self.$broadcast('cyc-broadcast',time);
                          }
                        }
                      }
                    });
                  }

                }
              }else {
                this.isChange = false;
                this.balance = 0;
                this.showCyc = true;
              }
              this.goBuy = true;
              console.log(item, this.fields[key]);

              for (var i = 0; i < this.fields.length; i++) {
                var curType = this.fields[i];
                curType.active = false;
              };

              this.fields[key].active = true;

              this.unitPrice = item.price;
              this.price = item.price * 1;
              this.ide_choose = item.name;
              // this.$emit('cycSelected',{
              //   cyc: 1,
              //   unit: '月',
              // });

              function daysBetween(DateOne,DateTwo){
                console.log(DateOne);
                console.log(DateTwo);
                _self.balancePeriod= DateOne + '--' + DateTwo;
                 var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));

                 //计算两个时间相差几天时用的语句
                 //var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);
                 var OneDay = DateOne.substring(DateOne.lastIndexOf('-') + 1, DateOne.indexOf(' '));
                 var OneYear = DateOne.substring(0, DateOne.indexOf('-'));
                 var OneHouse = DateOne.substring(DateOne.indexOf(' ') + 1, DateOne.indexOf(':'));

                 var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));
                 var TwoDay = DateTwo.substring(DateTwo.lastIndexOf('-') + 1, DateTwo.indexOf(' '));
                 var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
                 var TwoHouse = DateTwo.substring(DateTwo.indexOf(' ') + 1, DateTwo.indexOf(':'));

                 //计算两个时间相差几个小时
                 //var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000 * 24 + (OneHouse - TwoHouse));

                 //计算两个时间相差几天
                 var cha = (Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear))/ (1000*60*60*24*30);
                 console.log(cha);
                 return Math.abs(cha);
               }
            },

            addMonth() {
              this.size ++;
            },

            minusMonth() {
              this.size --;
            },

            useWeixin: function() {
                console.log("useWeixin");
            },

            useAlipay: function() {

            },

            changeSetMeal: function() {
                this.showSetMealForm = true;
            },

            chooseSetMeal: function() {
                this.showSetMealForm = false;
                this.showTopupForm = true;
                if(this.isAlipay){
                  window.location.href = this.alipayUrl;
                }else{
                  notification.alert("请确认微信扫码支付完成");
                }

            },

            setMealNextStep: function() {
                if(!this.goBuy) {
                  notification.alert("请选择非当前版本的收费版本");
                }else{
                  this.setMeal.currentStep++;
                }

                if(this.setMeal.currentStep == 3) {
                  var _self = this;
                  this.orderNo =  _md5(uuid.v4());
                  localStorage.orderNo = this.orderNo;
                  console.log(this.orderNo);

                  if((this.size * this.unitPrice - this.balance) < 0){
                      notification.alert('订单价格不能为负数，请选择最少购买月份');
                  }else{
                      services.Common.create({
                        url: 'orders',
                        param: {
                          creator: currentUser,
                          name: 'IDE续费或升级',
                          orderNo: this.orderNo,
                          timeSize: this.size,
                          timeUnit: "月",
                          products: this.products,
                          price: this.size * this.unitPrice - this.balance,
                          unitPrice: this.unitPrice,
                          type: 'ide',
                          balance: this.balance,
                          balancePeriod: this.balancePeriod,
                          balanceTime: this.balanceTime,
                        },
                        cb: function(res) {
                          if(res.data.code == 1) {
                            notification.alert("下单成功");
                            _self.qrcode = res.data.fields.wechat;
                            _self.alipayUrl = res.data.fields.alipay;
                          }
                        }
                      });
                  }
                }
            },

            setMealPrevStep: function() {
                this.setMeal.currentStep--;
            },

            useAlipay: function() {

            },

            useWeinxin: function() {

            },
            genQrcode: function() {

                var _self = this;
                console.log(_self.isWechat);
                if(_self.isWechat) {
                  this.showRenewForm = true;
                  services.OrderService.order({
                    out_trade_no: _self.orderNo,
                    price: this.size * this.unitPrice,
                    type: 'wechat',
                    name: 'Gospel IDE 付费升级',
                  }).then(function(res){
                      console.log(res);
                      _self.qrcode = res.data.code_url;
                      //window.location.href = res.body;
                  },function(err,res){

                  });
                }

            },
            initIDE: function(){

                var _self = this;
                console.log(this);
                services.Common.list({
                  param:{
                    type: 'ide'
                  },
                  url: 'products',
                  cb: function(res){

                        if(res.status == 200){

                            var data = res.data;
                            if(data.code == 1){

                                var show = new Array();
                                for(var i = 0; i<= data.fields.length-1; i++){
                                  if(!data.fields[i].free){
                                    show.push(data.fields[i])
                                  }else{
                                    _self.unitPrice =  data.fields[i].price;
                                    _self.price = data.fields[i].price * 1;
                                    _self.goBuy = false;
                                    console.log("ss");

                                    _self.ide_choose =  data.fields[i].name;
                                  }

                                  if(_self.ide.name == data.fields[i].name) {
                                    data.fields[i].active = true;
                                  }else {
                                    data.fields[i].active = false;
                                  }

                                  _self.ideInfoLoaded = true;

                                }
                                _self.fields = show;
                            }
                        }

                  }
                });

                services.Common.count({
                    url: 'applications',
                    param: {
                        creator: currentUser
                    },
                    cb: function(res){
                          if(res.status == 200){
                              var data = res.data;
                              if(data.code == 1){
                                  _self.applicationsCount = data.fields;
                              }
                          }
                    }
                });

                var ide = localStorage.getItem('ide');

                services.Common.getOne({
                   param: {
                     id: ide
                   },
                   url: "ides",
                   cb: function(res) {
                     if(res.status == 200){
                         var data = res.data;
                         if(data.code == 1){
                             _self.ide = data.fields;

                             var d = new Date(data.fields.expireAt);

                             if(data.fields.expireAt == null) {

                               _self.time_show = '个人免费版本';
                               _self.expireAt = null;
                             }else{
                               _self.time_show = '到期时间： ' + dataFormat(d,"yyyy-MM-dd hh:mm:ss");
                               _self.expireAt = data.fields.expireAt;
                               _self.oldVersion = data.fields.product;


                             }


                         }
                     }
                   }
                 });
            }
        },

        ready: function() {
            this.$get("initIDE")();
        },
        watch: {
        //    selected: function(item) {
        //       this.products = item.id;
        //       this.unitPrice = item.price;
        //       this.price = this.unitPrice + " X 1 月 = " + this.unitPrice;
        //    }
       },
       events: {
         'cycSelected': function(cyc) {

            this.size = cyc.cyc;
            var d = "";
             if(this.expireAt == null || this.expireAt == '') {
                  d = new Date();
             }else{
                 d = new Date(this.expireAt);
             }


             console.log(d.getHours());
             var num = parseInt(cyc.cyc)
             console.log(cyc.cyc);

             d.setMonth(d.getMonth() + 1 + num);

             this.time_show = dataFormat(d,"yyyy-MM-dd hh:mm:ss");
             console.log('时间是' + this.time_show);
             this.total = cyc.cyc * this.unitPrice - this.balance;

             if(this.balance == 0) {
               this.price = this.unitPrice + " X " + cyc.cyc + " " + cyc.unit + " = " + this.total;
             }else{
               this.price = this.unitPrice + " X " + cyc.cyc + " " + cyc.unit + " - " + this.balance + " = " + this.total.toFixed(2);
             }

             console.log(cyc);
             function dataFormat(date,fmt){ //author: meizz
                var o = {
                  "M+" : date.getMonth()+1,                 //月份
                  "d+" : date.getDate(),                    //日
                  "h+" : date.getHours(),                   //小时
                  "m+" : date.getMinutes(),                 //分
                  "s+" : date.getSeconds(),                 //秒
                  "q+" : Math.floor((date.getMonth()+3)/3), //季度
                  "S"  : date.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt))
                  fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                  if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            }
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
         }
       }
    }
</script>
