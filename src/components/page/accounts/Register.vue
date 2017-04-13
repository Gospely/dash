<template>
    <div class="container">
      <bg></bg>
        <div class="signup-form ">
          <div class="signup-form__logo-box">
            <div class="signup-form__logo"></div>
            <div class="signup-form__catchphrase">完善信息--快速开始您的开发</div></div>
          <div id="container-login" v-show="completeInfo">
            <div data-reactroot="" id="LoginComponent" @keydown="keyDownComplete">
              <span>
                  <div class="input-field-group">
                    <div class="input-field">
                      <input type="text" v-model='name' id="registerName" placeholder="用户名,仅支持英文" autocapitalize="off" @blur="checkName" style="border: none;"></div>
                      <div class="input-field">
                      <input type="text" id="registerAccount" v-model="phone" placeholder="请填写邮箱账号或手机号(选填)" autocapitalize="off" @blur="weChatCheckPhone" style="border: none;"></div>
                  </div>
                  <ul class="error-msg-list"></ul>
                  <button :class="['signup-form__submit']" @click="completeUser" >完成</button>
                  <div class="signup-form-nav">
                    <div class="left">
                    </div>
                    <div class="right">
                      <a v-link="{name:'login'}">已有账户?登录</a>
                    </div>
                  </div>
              </span>
            </div>
          </div>
          <div id="container-login" v-show="!completeInfo">
            <div data-reactroot="" id="LoginComponent" @keydown="keyDownLogin">
              <span>
                  <div class="input-field-group">
                    <div class="input-field">
                      <input type="text" id="registerAccount" v-model="phone" placeholder="请填写邮箱账号或手机号" autocapitalize="off" @blur="checkPhone" style="border: none;"></div>
                    <div class="input-field">
                      <input type="text" v-model='name' id="registerName" placeholder="用户名,仅支持英文" autocapitalize="off" @blur="checkName" style="border: none;"></div>
                    <div class="input-field">
                      <input type="password" v-model="password" placeholder="请输入密码" autocapitalize="off" style="border: none;" @blur="checkPwdAgain"></div>
                    <div class="input-field">
                      <input type="password" id="registerRePassword" v-model="rePwd" placeholder="重复密码" autocapitalize="off" style="border: none;" @blur="checkPwd">
                    </div>
                    <!--<div class="input-field">
                      <input type="text" id="inviteCode" v-model="inviteCode" placeholder="请输入邀请码" autocapitalize="off" style="border: none;">
                    </div>-->
                    <div class="input-field">
                      <input type="text" v-model="authCode" :disabled="btn_info == '获取验证码'" placeholder="验证码" autocapitalize="off" style="border: none;" >
                    </div>
                  </div>
                  <a class="button" @click="getTelCode" :disabled="phone == '' || btn_disabled" style="position: absolute; margin-top: -42px; height: 41px; right: 30px; border: 1px solid #dfebf2;">{{btn_info}}</a>
                  <ul class="error-msg-list"></ul>
                  <button :class="['signup-form__submit', {'is-disabled': !isValNull}]" @click="register" >注册</button>
                  <div class="signup-form-nav">
                    <div class="left">
                    </div>
                    <div class="right">
                      <a v-link="{name:'login'}">已有账户?登录</a>
                    </div>
                  </div>
              </span>
            </div>
          </div>
          <div class="signup-form__sns-btn-area" v-show="!completeInfo">
            <!--<div>封测阶段暂不支持第三方OAuth登录</div>-->
             <div class="sns-button-list">
              <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx48e0c6824ebf0d3a&redirect_uri=http://api.gospely.com/weixin/callback&response_type=code&scope=snsapi_login&state=12123#wechat_redirect"><span class="icon"><i class="fa fa-wechat"></i></span>&nbsp;&nbsp;微信登录</a>
              <a></a>
              <!-- <span class="icon"><i class="fa fa-github"></i></span> -->
            </div>
          </div>
        </div>
        <register-loading v-show="isRegisting" tip="注册中..."></register-loading>
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

    #LoginComponent .is-disabled {
        opacity: .5;
    }

</style>
<script>

    import bg from '../../ui/Bg.vue';
    import RegisterLoading from '../../ui/Loading.vue';

    import cookie from '../../../lib/cookies.js';

    var setCookie = cookie.setCookie;

    export default{
        data () {
            return {
                phone:'',
                name:'',
                password:'',
                rePwd:'',
                authCode:'',
                token: '',
                isPhone: true,
                btn_info: "获取验证码",
                inviteCode: '',
                btn_disabled: false,
                wait: 60,
                isRegisting: false,
                completeInfo: false,
                user:''
            }
        },
        components: {
          bg,
          RegisterLoading
        },

        methods: {

          register: function(){
            this.isRegisting = true;
            var self = this;
            var user = {
              phone: this.phone,
              password: this.password,
              name: this.name,
              token: this.token,
              authCode: this.authCode,
              inviteCode: this.inviteCode
            };

            setTimeout(function() {
              _self.isRegisting = false;
            }, 40000);

            services.UserService.register(user).then(function(res) {
              self.isRegisting = false;
              if(res.status === 200){

                var data = res.data;
                if(data.code == 1){
                    notification.alert('注册成功');
                    console.log(res.data.fields);
                    localStorage.setItem("user",res.data.fields.id);
                    localStorage.setItem("userName",res.data.fields.name);
                    localStorage.setItem("ide",res.data.fields.ide);
                    localStorage.setItem("ideName",res.data.fields.ideName);
                    localStorage.setItem("token",res.data.fields.token);
                    setCookie('user',res.data.fields.id,15 * 24 * 60 * 60 * 1000);
                    setCookie('token',res.data.fields.token, 15 * 24 * 60 * 60 * 1000);
                    setCookie('userName',res.data.fields.name, 15 * 24 * 60 * 60 * 1000);
                    setCookie('host',res.data.fields.host, 15 * 24 * 60 * 60 * 1000);
                    console.log(localStorage.getItem("user"));
                    window.location.href = window.baseUrl;
                }else{
                    notification.alert(data.message);
                }
              }
            },function(err){
                notification.alert('服务器异常');
                this.phone = '';
                this.name = '';
                this.password = '';
                this.rePwd = '';
            }
            );
          },
          keyDownLogin:function(event){
              if (event.keyCode == 13) {
                this.checkName();
                this.checkPhone();
                let focuseElem = document.activeElement.id;
                if (!this.isValNull || focuseElem === 'registerAccount' ||
                     focuseElem === 'registerName') {
                    return false;
                }
                this.register();
              }
          },
          completeUser(){

              var phone = /^1[34578]\d{9}$/.test(this.phone)? this.phone : '';
              var email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.phone)? this.phone : '';
              services.Common.create({
                  url: 'users/complete',
                  param: {
                      name: this.name,
                      id: this.user,
                      phone: phone,
                      email: email
                  },
                  cb: function(res){
                      if(res.status === 200){

                        var data = res.data;
                        if(data.code == 1){
                            notification.alert('注册成功');
                            console.log(res.data.fields);
                            localStorage.setItem("user",res.data.fields.id);
                            localStorage.setItem("userName",res.data.fields.name);
                            localStorage.setItem("ide",res.data.fields.ide);
                            localStorage.setItem("ideName",res.data.fields.ideName);
                            localStorage.setItem("token",res.data.fields.token);
                            setCookie('user',res.data.fields.id,15 * 24 * 60 * 60 * 1000);
                            setCookie('userName',res.data.fields.name, 15 * 24 * 60 * 60 * 1000);
                            setCookie('host',res.data.fields.host, 15 * 24 * 60 * 60 * 1000);
                            console.log(localStorage.getItem("user"));
                            window.location.href = window.baseUrl;
                        }else{
                            notification.alert(data.message);
                        }
                      }
                  }
              });
          },
          keyDownComplete: function(event){
              if (event.keyCode == 13) {
                this.checkName();
                let focuseElem = document.activeElement.id;
                if (!this.isValNull || focuseElem === 'registerAccount' ||
                     focuseElem === 'registerName') {
                    return false;
                }
                this.completeUser();
              }
          },
          getTelCode: function(){

              if(this.isPhone){
                console.log("code");
                var _self = this;
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
                          notification.alert(data.message);
                        }
                      }
                  }
                });
              }else{
                var _self = this;
                if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).test(_self.phone)) {
                    return false;
                }

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
                          notification.alert(data.message);
                        }
                      }
                  }
                });
              }

              _self.$get("renderButton")();
          },
          renderButton: function() {

            var _self = this;

            _self.btn_info = _self.wait;
            if (_self.wait == 0) {
                _self.btn_info = "免费获取验证码";
                _self.btn_disabled = false;
                _self.wait = 60;
            } else {
                _self.btn_info="重新发送(" +_self.wait + ")";
                _self.btn_disabled = true;
                _self.wait--;
                setTimeout(function() {
                    _self.renderButton()
                },
                1000)
            }

          },
          weChatCheckPhone: function() {

            if(this.phone){
                this.checkPhone();
            }
          },
          checkPhone: function() {

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
                      if(data.code == -1){
                        console.log(data);
                        notification.alert('该手机已注册');
                        _self.phone = '';
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
                      if(data.code == -1){
                        console.log(data);
                        notification.alert('该邮箱已注册');
                        _self.phone = '';
                      }
                    }
                  }
                }
             }

            if(_self.phone != null && _self.phone != '' && _self.phone != undefined) {
              services.Common.validator(options);
            }
          },
          checkName: function() {

            var _self = this;
            const illegalLetter = ['!',' ', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']',
                                '{', '}', '\\', '|', ':', ';', '\'', '"', '<', '>', ',', '.', '/', '?'];
            let theCurrentLetter = _self.name.split('');
            for (var i = 0; i < theCurrentLetter.length; i++) {

                if(illegalLetter.indexOf(theCurrentLetter[i]) !== -1) {
                    notification.alert('请勿输入非法字符: \' ' + theCurrentLetter[i] + ' \'', 'warning');
                    _self.name = '';
                    return false;
                }
            }
            if(_self.name !=null &&_self.name != '' && _self.name != undefined) {
              services.Common.validator({
                url: "users",
                param: {
                  name: _self.name
                },
                cb: function(res) {
                  if(res.status == 200){
                    var data = res.data;
                    if(data.code == -1){
                      console.log(data);
                      notification.alert('该用户名已注册');
                     _self.name = '';
                    }
                  }
                }
              });
            }
            var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            if(reg.test(this.name)){
              notification.alert("用户名不能包含中文");
              document.getElementById('registerName').focus();
              this.name = '';
            }
          },
          checkPwd(){
            if(this.password != this.rePwd){
              notification.alert("两次密码不一致");
              // document.getElementById('registerRePassword').focus();
            }
          },
          checkPwdAgain() {
            if (this.rePwd != '' && this.password != this.rePwd) {
                notification.alert("两次密码不一致");
            }
          }
        },
        ready: function(){
            console.log('ready');
            var user = this.$route.query.user;
            console.log(user);
            if(user){
                this.completeInfo = true;
            }
            this.user = user;
            console.log('ready');
      },
        computed: {
            isValNull() {
                return this.phone != '' && this.name !='' && this.password != '' && this.rePwd != '' && this.authCode != '' && this.password == this.rePwd;
            }
        }
    }
</script>
