<template>
    <div class="container" style="min-height:800px">

      <bg></bg>

        <div class="signup-form ">
          <div class="signup-form__logo-box">
            <div class="signup-form__logo"></div>
            <div class="signup-form__catchphrase">快速开始您的创作过程</div></div>
          <div id="container-login">
            <div data-reactroot="" id="LoginComponent">
              <span>
                  <div class="input-field-group">
                    <div class="input-field">
                      <input type="text" v-model='phone' placeholder="邮箱/手机号码" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="password" v-model='password' placeholder="请输入密码" autocapitalize="off" style="border: none;"></div>
                  </div>
                  <ul class="error-msg-list"></ul>
                  <button  class="signup-form__submit" @click="login">登录</button>
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

</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'
    import Qrcanvas from 'jsqrgen-vue';
    import bg from '../../ui/Bg.vue';

    export default{
        data () {
            return {
                showForgotPwForm: false,
                hasSent: false,
                phone: '',
                password: ''
            }
        },
        components: {
            Modal,
            Qrcanvas,
            bg
        },

        methods: {
            sendCode: function() {

            },

            confirmVerify: function() {

            },
            login: function() {

              alert("begin");
              var user = {
                  phone: this.phone,
                  password: this.password
              }

              services.UserService.login(user).then(function(res) {

                alert(res.data.fields);
                if(res.status === 200){
                  if(res.data.code != 1){
                      notification.alert(res.data.message,'danger');
                  }else{
                    localStorage.setItem("user",res.data.fields);
                    localStorage.setItem("token",res.data.fields.token);
                    notification.alert('登录成功');
                    alert(window.baseUrl);
                    window.location.href = window.baseUrl;
                  }
                }
              },function(err){
                  notification.alert('服务器异常','danger');
                  this.phone = '';
                  this.password = '';
              }
              );
              alert("finish");
            }
        }
    }
</script>
