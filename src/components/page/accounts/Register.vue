<template>
    <div class="container" style="min-height:800px">

        <div class="signup-form ">
          <div class="signup-form__logo-box">
            <div class="signup-form__logo"></div>
            <div class="signup-form__catchphrase">快速开始您的创作过程</div></div>
          <div id="container-login">
            <div data-reactroot="" id="LoginComponent">
              <span>
                  <div class="input-field-group">
                    <div class="input-field">
                      <input type="text" v-model="phone" placeholder="邮箱/手机号码" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="text"v-model='name' placeholder="用户名,仅支持英文" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="password" v-model="password" placeholder="请输入密码" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="password" v-model="rePwd" placeholder="重复密码" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="text" v-model="authCode" placeholder="验证码" autocapitalize="off" style="border: none;"></div>
                  </div>
                  <ul class="error-msg-list"></ul>
                  <button class="signup-form__submit" @click="register">注册</button>
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
          <div class="signup-form__sns-btn-area">
            <div>我们支持通过微信和Github登录</div>
            <div class="sns-button-list">
              <a><span class="icon"><i class="fa fa-wechat"></i></span></a>
              <a><span class="icon"><i class="fa fa-github"></i></span></a>
            </div>
          </div>
        </div>

    </div>
</template>
<style>

    .container {
        background: #b72f20;
        overflow: visible;
    }

    .app-main {
        background: #b72f20;
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
        background: #b72f20;
        padding-left: 0px;
    }

</style>
<script>

    export default{
        data () {
            return {
                phone:'',
                name:'',
                password:'',
                rePwd:'',
                authCode:''
            }
        },
        components: {

        },

        methods: {
          register: function(){
            var user = {
              phone: this.phone,
              password: this.password,
              name: this.name
            };
            services.UserService.register(user).then(function(res) {

              if(res.status === 200){
                notification.alert('登录成功');
              }
            },function(err){
                notification.alert('服务器异常');
            }
            );
          },
          getTelCode: function() {

          }
        }
    }
</script>
