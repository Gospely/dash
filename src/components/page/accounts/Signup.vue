<template>
    <div class="container" style="min-height:800px">

        <div class="signup-form">
          <div class="signup-form__logo-box">
            <div class="signup-form__logo"></div>
            <div class="signup-form__catchphrase">快速开始您的创作过程</div></div>
          <div>
            <a v-link="{name: 'signupa'}" class="signup-form__submit ga-event">注册</a>
            <a v-link="{name: 'login'}" class="signup-form__submit--login">登录</a></div>
          <div class="signup-form__sns-btn-area">
            <div>我们支持微信和Github帐号登录</div>
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

    .signup-form {
        width: 300px;
        position: absolute;
        top: 20%;
        left: 50%;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.92);
        width: 363px;
        margin-left: -181.5px;
        padding: 50px 0;
        border-radius: 4px;
        font-size: 16px;
    }

    .signup-form__logo-box {
        margin-bottom: 40px;
    }

    .logo, .signup-form__logo {
        display: inline-block;
        width: 180px;
        height: 70px;
        background-image: url(https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png);
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
    }

    .radius-flat-rectangle, .btn-sns, .btn-gplus, .btn-facebook, .btn-twitter, .btn-weibo, .signup-form__submit, .signup-form__submit--login { border: none; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; }

    .btn, .btn-sns, .btn-gplus, .btn-facebook, .btn-twitter, .btn-weibo, .signup-form__submit, .signup-form__submit--login { cursor: pointer; display: inline-block; text-align: center; text-decoration: none; }

    .btn-sns, .btn-gplus, .btn-facebook, .btn-twitter, .btn-weibo { width: 80px; height: 40px; margin-top: 10px; }

    .signup-form { width: 300px; position: absolute; top: 20%; left: 50%; text-align: center; background-color: rgba(255, 255, 255, 0.92); width: 363px; margin-left: -181.5px; padding: 50px 0; border-radius: 4px; font-size: 16px; }
    @media (max-width 540px) { .signup-form { top: 50px; width: 310px; margin-left: -160px; background-color: #eeeeee; } }

    .signup-form__logo-box {
        margin-bottom: 40px;
    }
    @media (max-width 540px) { .signup-form__logo-box { margin-bottom: 24px; } }

    .signup-form__logo {
        margin-bottom: 6px;
    }

    .signup-form__catchphrase {
        color: #757c80;
        font-size: 12px;
        font-weight: bold;
    }

    .signup-form__submit, .signup-form__submit--login { display: block; margin: 0 auto; margin-bottom: 8px; width: 300px; height: 40px; line-height: 40px; background-color: #25c6ff; color: #FFF; font-weight: bold; outline: none; }

    .signup-form__submit--login { background-color: #6d7084; }

    .signup-form__sns-btn-area { color: #666666; font-size: 12px; width: 302px; box-sizing: border-box; margin: 0 auto; margin-top: 16px; padding: 20px 26px; background-color: #ffffff; border: solid 1px #dfebf2; border-radius: 4px; }

    .sns-button-list { margin-top: 14px; }
    .sns-button-list .btn-item { display: inline-block; margin: 0 2px; }
    .sns-button-list .btn-item:first-child { margin-left: 0; }
    .sns-button-list .btn-item:last-child { margin-right: 0; }

    .signup-form__submit:hover {
        color: #fff;
    }

    .signup-form__submit--login:hover {
        color: #fff;
    }

</style>
<script>

    export default{
        data () {
            return {
                
            }
        },
        components: {

        },

        methods: {
            
        }
    }
</script>
