<template>
    <div class="container" style="min-height:800px">

      <bg></bg>

        <div class="signup-form ">
          <div class="signup-form__logo-box">
            <div class="signup-form__logo"></div>
            <div class="signup-form__catchphrase">快速开始您的开发</div></div>
          <div id="container-login">
            <div data-reactroot="" id="LoginComponent" @keydown="keyDownLogin">
              <span>
                  <div class="input-field-group">
                    <div class="input-field">
                      <input type="text" v-model='phone' placeholder="请填写邮箱账号" autocapitalize="off" style="border: none;" disabled={{logining}}></div>
                    <div class="input-field">
                      <input type="password" v-model='password' placeholder="请输入密码" autocapitalize="off" style="border: none;" disabled={{logining}}>
                    </div>
                    <div class="input-field">
                          <input type="text" v-model='code' placeholder="请输入验证码" autocapitalize="off" style="border: none;" v-show='code_show' disabled={{logining}}>
                    </div>
                    <div v-show='code_show' class="input-field" style="position: absolute; height: 41px; width:100px; margin-top: -42px; right: 32px; border: 1px solid #dfebf2;">
                      <img :src="code_src" height='41px' width='100px' alt="验证码" @click="changeCode"/>
                    </div>

                  <ul class="error-msg-list"></ul>
                  <button :class="['signup-form__submit', {'is-disabled': logining || phone =='' || password == '' || code_show && code == ''}]" @click="login" >登录</button>
                  <div class="signup-form-nav">
                    <div class="left">
                    </div>
                    <div class="right">
                      <a v-link="{name:'signupa'}">注册新账户</a>&nbsp;&nbsp;
                      <a @click="showForgotPwForm = true">忘记密码</a>
                    </div>
                  </div>
              </span>
            </div>
          </div>
          <div class="signup-form__sns-btn-area">
            <div>封测阶段暂不支持第三方OAuth登录</div>
            <div class="sns-button-list">
              <!-- <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx48e0c6824ebf0d3a&redirect_uri=http://api.gospely.com/weixin/callback&response_type=code&scope=snsapi_login&state=12123#wechat_redirect"><span class="icon"><i class="fa fa-wechat"></i></span></a> -->
              <!-- <a><span class="icon"><i class="fa fa-github"></i></span></a> -->
            </div>
          </div>
        </div>

        <modal :is-html="true" :is-show.sync="showForgotPwForm">
            <div slot="header">忘记密码</div>
            <div slot="body">
                <p class="control has-icon has-icon-right" style="margin-top:10px">
                  <input class="input is-danger" type="text" placeholder="手机或邮箱" v-model="phone">
                  <i class="fa fa-warning"></i>
                </p>
                <p v-show="hasSent" class="control has-icon has-icon-right" style="margin-top:10px">
                  <input class="input is-danger" type="text" placeholder="请输入接收到的验证码" v-model="authCode">
                  <i class="fa fa-warning"></i>
                </p>
                <p v-show="hasSent" class="control has-icon has-icon-right" style="margin-top:10px" >
                  <input class="input is-warning" type="password" placeholder="请输入新密码" v-model="newPass">
                  <i class="fa fa-lock"></i>
                </p>
                <p v-show="hasSent" class="control has-icon has-icon-right" style="margin-top:10px">
                  <input class="input is-warning" type="password" placeholder="重复密码" v-model="rePass">
                  <i class="fa fa-lock"></i>
                </p>

            </div>
            <div slot="footer">
                <button v-show="!hasSent" class="button is-success"
                    @click="sendCode">
                发送
                </button>
                <button v-show="hasSent" class="button is-success"
                    @click="verifyCode">
                确认修改
                </button>
                <button class="button" @click="modifyConcle">取消</button>
            </div>
        </modal>

        <login-loading v-show="logining" :tip="'登录中...'"></login-loading>
    </div>

</template>
<style>

    .container {
        overflow: visible;
    }

    .side-bar {
        display: none;
    }

    .app-main {
        margin-left: 0px;
    }

    .app-main-header {
        display: none;
    }

    .app-main-body {
        padding-left: 0px;
        padding: 0px;
        margin-top: 0px;
    }
    .input-field-group .is-disabled {
        opacity: 0.5;
    }

</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'
    import Qrcanvas from 'jsqrgen-vue';
    import bg from '../../ui/Bg.vue';
    import LoginLoading from '../../ui/Loading.vue';

    import cookie from '../../../lib/cookies.js';

    var setCookie = cookie.setCookie;

    export default{
        data () {
            return {
                showForgotPwForm: false,
                hasSent: false,
                phone: '',
                password: '',
                img: '',
                code_src: '',
                code_show: false,
                code: '',
                token: '',
                logining: false,
                rePass: '',
                authCode: '',
                newPass: ''
            }
        },
        components: {
            Modal,
            Qrcanvas,
            bg,
            LoginLoading
        },

        created () {

        },

        methods: {

        	getRequest:function(){
			      var url = window.location.href;
			      if (url.indexOf("?") != -1) {    //判断?后面是否有参数
				      var str = url.split("?")[1];
				      var strNum = str.split("=");
				      return strNum[1];
			      }else{
				      return null;
			      }
        	},
           modifyConcle: function() {
               this.showForgotPwForm = false;
               this.rePass = '';
               this.newPass = '';
               this.hasSent = false;
               this.authCode = '';
           },
           sendCode: function() {

             var _self = this;
              var re=/^1[34578]\d{9}$/;
              if(re.test(_self.phone)){
                 _self.isPhone = true;
                 var options = {
                   url: "users",
                   param: {
                     phone: _self.phone
                   },
                   cb: function(res) {
                     if(res.status == 200){
                       var data = res.data;
                       if(data.code == 1){
                         console.log(data);
                         notification.alert('该手机未注册');
                         _self.phone = '';
                     }else{
                         _self.sendPhoneCode();
                     }
                     }
                   }
                 }
              }else{
                 _self.isPhone = false;
                 let email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                 if(!email.test(_self.phone) && _self.phone != '') {
                     notification.alert('邮箱或手机号码错误');
                     document.getElementById('registerAccount').focus();
                     return false;
                 }

                 var options = {
                   url: "users",
                   param: {
                     email: _self.phone
                   },
                   cb: function(res) {
                     if(res.status == 200){
                       var data = res.data;
                       if(data.code == 1){
                         console.log(data);
                         notification.alert('该邮箱未注册');
                         _self.phone = '';
                     }else{
                         _self.sendEmialCode();
                     }
                     }

                   }
                 }
              }

             if(_self.phone != null && _self.phone != '' && _self.phone != undefined) {
               services.Common.validator(options);
             }
           },
          sendPhoneCode: function() {

              var _self = this;
              //发送手机验证码
              services.Common.list({
                url: 'users/phone/code',
                param: {
                  phone: _self.phone,
                },
                cb: function(res) {
                    if(res.status == 200){
                      var data = res.data;
                      if(data.code ==1){
                        console.log(data);
                        _self.token = data.fields;
                        _self.hasSent = true;
                        notification.alert(data.message);
                      }
                    }
                }
              });
          },
          sendEmialCode: function() {

              var _self = this;
              //发送邮箱验证吗
              services.Common.list({
                url: 'users/email/code',
                param: {
                  email: _self.phone,
                },
                cb: function(res) {
                    if(res.status == 200){
                      var data = res.data;
                      if(data.code ==1){
                        console.log(data);
                        _self.token = data.fields;
                        _self.hasSent = true;
                        notification.alert(data.message);
                      }
                    }
                }
              });
          },
          confirmVerify: function() {

          },

          login: function() {
            this.logining = true;
            var where = this.getRequest();
            var _self = this;
            //判断是否是邮箱
            var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    		    var isok = reg.test(this.phone);
    		    var user = {};
        		if(isok){
        		 	user = {
      	 	 	   	email: this.phone,
      	     		password: this.password,
      				  code: this.code,
      				  code_token: this.token
      		 	  }
        		}else{
                  if(!(/^0?(13[0-9]|15[012356789]|18[0-9]|17[0-9])[0-9]{8}$/.test(this.phone))) {
                    notification.alert('账号格式错误','danger');
                    this.logining = false;
                    return false;
                  }
      		   	user = {
        				phone: this.phone,
        				password: this.password,
        				code: this.code,
        				code_token: this.token
  	           }
      		  }

            setTimeout(function() {
              _self.logining = false;
            }, 40000);

            services.UserService.login(user).then(function(res) {
                _self.logining = false;
                if(res.status === 200){
                      if(res.data.code != 1){
                          notification.alert(res.data.message,'danger');
                          var count = localStorage.getItem('error');
                          if(count != null &&  count != undefined && count != ''){

                            if(count > 3){
                              _self.isAuth = true;
                              _self.code_show = true;
                              _self.$get('getImageCode')();
                            }
                            localStorage.setItem('error',count+1);
                          }else{
                            localStorage.setItem('error',1);
                          }
                      }else{
                        localStorage.removeItem('error');
                        console.log(_self.password);
                        localStorage.password =  _self.password;
                        localStorage.phone = _self.phone;
                        localStorage.setItem("user",res.data.fields.id);
                        setCookie('user',res.data.fields.id,15 * 24 * 60 * 60 * 1000);
                        setCookie('token',res.data.fields.token, 15 * 24 * 60 * 60 * 1000);
                        setCookie('userName',res.data.fields.name, 15 * 24 * 60 * 60 * 1000);
                        setCookie('host',res.data.fields.host, 15 * 24 * 60 * 60 * 1000);
                        localStorage.setItem("userName",res.data.fields.name);

                        localStorage.removeItem("isActive");
                        if(res.data.fields.isBlocked === 1) {
                          localStorage.setItem("isActive",true);
                        }
                        localStorage.setItem("ide",res.data.fields.ide);
                        localStorage.setItem("ideName",res.data.fields.ideName);
                        localStorage.setItem("token",res.data.fields.token);
                        notification.alert('登录成功');

                        if(where=="fromIde"){

                          if(document.domain != 'localhost') {
                            window.location.href = "http://ide.gospely.com";
                          }else {
                            window.location.href = "http://localhost:8989/";
                          }
                        }else{
                        	window.location.href = window.baseUrl;
                        }

                    }
                }
            },function(err){
                notification.alert('服务器异常','danger');
                this.phone = '';
                this.password = '';
            });
          },

          keyDownLogin:function(event){
            var disabled = this.logining || this.phone =='' || this.password == '' || this.code_show && this.code == '';
            if (event.keyCode == 13 && !disabled) {
                this.login();
            }else {
                return false;
            }
          },

          changeCode: function() {
              this.isAuth = true;
              // this.code_src = 'http://api.gospely.com/users/code?time=' + Date.now();
              this.$get('getImageCode')();
          },

          getImageCode: function() {

            var _self = this;
            services.UserService.getCode().then(function(res){
                if(res.status === 200) {
                  var data = res.data;
                  console.log(data);
                  if(data.code == 1) {
                      _self.token = data.fields.token;
                      _self.code_src = data.fields.buf;
                  }
                }
            }, function(err){
              notification.error('获取验证码失败');
            });
          },

          verifyCode: function () {

              var _self = this;
              if(_self.authCode == ''){
                  notification.error('请输入验证码');
                  return fals;
              }
              console.log(_self.rePass);
              if(_self.rePass == '' || _self.newPass == ''){
                  notification.error('密码不能为空');
                  return false;
              }
              if(_self.rePass != _self.newPass){
                  notification.error('密码不一致');
                  return fals;
              }
              //修改密码
              services.Common.create({
                  url: 'users/modify',
                  param: {
                      token: _self.token,
                      password: _self.newPass,
                      authCode: _self.authCode,
                      phone: _self.phone
                  },
                  cb: function(res){
                      notification.alert(res.data.message);
                      if(res.data.code == 1){
                           _self.showForgotPwForm = false;
                           _self.hasSent = false;
                           _self.token = '';
                      }
                      _self.rePass = '';
                      _self.newPass = '';
                      _self.authCode = '';
                  }
              });
          }
        },

        ready: function(){
          console.log(localStorage.token);
          console.log(this.token);

          this.password = localStorage.password;
          this.phone = localStorage.phone;
          function getCookie(c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + "=");
              if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";",c_start);
                if (c_end == -1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
              }
            }
            return "";
          }
          if(this.getRequest() != null){
              cookie.setCookie('token','','Thu, 01 Jan 1970 00:00:00 GMT');
              cookie.setCookie('user','','Thu, 01 Jan 1970 00:00:00 GMT');
          }
          if(getCookie.token){
            if(document.domain == 'localhost') {
              window.location.href = "http://localhost:8088/";
            }else {
              window.location.href = "http://dash.gospely.com";
            }
          }

          var _self = this;
          localStorage.removeItem("isActive");
          var count = localStorage.getItem('error');
          if(count != null &&  count != undefined && count != ''){

            if(count > 3){
              _self.code_show = true;
              _self.$get('getImageCode')();
            }
            localStorage.setItem('error',count+1);

          }
        }
    }
</script>
