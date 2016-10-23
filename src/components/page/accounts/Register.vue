<template>
    <div class="container">
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
                      <input type="text" v-model="phone" placeholder="邮箱/手机号码" autocapitalize="off" @blur="checkPhone" style="border: none;"></div>
                    <div class="input-field">
                      <input type="text"v-model='name' placeholder="用户名,仅支持英文" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="password" v-model="password" placeholder="请输入密码" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="password" v-model="rePwd" placeholder="重复密码" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="text" v-model="authCode" placeholder="验证码" autocapitalize="off" style="border: none;" v-show="isPhone" ></div>
                  </div>
                  <a class="button" @click="getTelCode" v-show="isPhone" :disabled="btn_disabled" style="position: absolute; margin-top: -42px; height: 41px; right: 30px; border: 1px solid #dfebf2;">{{btn_info}}</a>
                  <ul class="error-msg-list"></ul>
                  <button class="signup-form__submit" @click="register" >注册</button>
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

    import bg from '../../ui/Bg.vue';

    export default{
        data () {
            return {
                phone:'',
                name:'',
                password:'',
                rePwd:'',
                authCode:'',
                token: '',
                isPhone: false,
                btn_info: "获取验证码",
                btn_disabled: false,
                wait: 60,
            }
        },
        components: {
          bg
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
                notification.alert('注册成功');
                window.location.href = 'http://localhost:8088';
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
          getTelCode: function(){

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

                        this.token = data.fields;
                        notification.alert(data.message);
                      }
                    }
                }
              });
              _self.renderButton();
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
          checkPhone: function() {

             var re=/^(13[0-9]{9})|(15[89][0-9]{8})$/;
             if(re.test(this.phone)){
                this.isPhone = true;
             }
              console.log("blur");
          }
        }
    }
</script>
