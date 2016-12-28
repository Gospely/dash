<template>
    <div class="container" style="min-height:800px">

      <bg></bg>

        <div class="signup-form ">
          <div class="signup-form__logo-box">
            <div class="signup-form__logo"></div>
            <div class="signup-form__catchphrase">快速开始您的创作过程</div></div>
          <div id="container-login">
            <div data-reactroot="" id="LoginComponent" @keydown="keyDownLogin">
              <span>
                  <div class="input-field-group">
                    <div class="input-field">
                      <input type="text" v-model='phone' placeholder="邮箱/手机号码" autocapitalize="off" style="border: none;" disabled={{logining}}></div>
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
                      <a v-link="{name:'signupa'}">注册新账户</a>&nbsp;&nbsp;<a @click="showForgotPwForm = true">忘记密码</a>
                    </div>
                  </div>
              </span>
            </div>
          </div>
          <div class="signup-form__sns-btn-area">
            <div>我们支持通过微信和Github登录</div>
            <div class="sns-button-list">
              <a href="https://open.weixin.qq.com/connect/qrconnect?appid=wx48e0c6824ebf0d3a&redirect_uri=http://api.gospely.com/weixin/callback&response_type=code&scope=snsapi_login&state=12123#wechat_redirect"><span class="icon"><i class="fa fa-wechat"></i></span></a>
              <a><span class="icon"><i class="fa fa-github"></i></span></a>
            </div>
          </div>
        </div>

        <modal :is-html="true" :is-show.sync="showForgotPwForm">
            <div slot="header">忘记密码</div>
            <div slot="body">
                <label class="label">验证方式</label>
                <p class="control" style="margin-top:15px">
                  <label class="radio">
                    <input type="radio" name="verify" checked>
                    手机验证
                  </label>
                  <label class="radio">
                    <input type="radio" name="verify">
                    邮箱验证
                  </label>
                </p>

                <label v-show="hasSent" class="label">请输入接收到的验证码</label>
                <p v-show="hasSent" class="control has-icon has-icon-right" style="margin-top:10px">
                  <input class="input is-danger" type="text" placeholder="请输入接收到的验证码">
                  <i class="fa fa-warning"></i>
                </p>

                <label v-show="hasSent" class="label">请输入新密码</label>
                <p v-show="hasSent" class="control has-icon has-icon-right" style="margin-top:10px">
                  <input class="input is-warning" type="password" placeholder="请输入新密码">
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
                <button class="button" @click="showForgotPwForm = false">取消</button>
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
    import LoginLoading from '../../ui/Loading.vue'

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
                logining: false
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

          sendCode: function() {

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
              services.UserService.login(user).then(function(res) {

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
                          localStorage.setItem("user",res.data.fields.id);
                          setCookie('user',res.data.fields.id,24*60*60*1000);
                          setCookie('token',res.data.fields.token,24*30*60*1000);
                          setCookie('userName',res.data.fields.name,24*30*60*1000);
                          localStorage.setItem("userName",res.data.fields.name);

                          localStorage.removeItem("isActive");
                          if(res.data.fields.isBlocked === 1) {
                            localStorage.setItem("isActive",true);
                          }
                          localStorage.setItem("ide",res.data.fields.ide);
                          localStorage.setItem("ideName",res.data.fields.ideName);
                          localStorage.setItem("token",res.data.fields.token);
                          notification.alert('登录成功');

                          function setCookie(c_name, value, expiredays) {
                            var exdate = new Date()
                            exdate.setDate(exdate.getDate() + expiredays)
                            document.cookie = c_name + "=" + escape(value) +
                              ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
                          }
                          if(where=="fromIde"){
                          	window.location.href = "http://localhost:8989/";
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
            this.logining = false;
          },

          keyDownLogin:function(){
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
              
          }
        },

        ready: function(){
          console.log(localStorage.token);
          console.log(this.token);
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

          if(getCookie.token){
            window.location.href = "http://localhost:8088/";
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
