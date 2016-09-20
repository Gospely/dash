<template>
    <div class="container" style="min-height:800px">

        <div class="signup-form ">
          <div class="signup-form__logo-box">
            <div class="signup-form__logo"></div>
            <div class="signup-form__catchphrase">快速开始您的创作过程</div></div>
          <div id="container-login">
            <div data-reactroot="" id="LoginComponent">
              <span>
                <form>
                  <div class="input-field-group">
                    <div class="input-field">
                      <input type="text" placeholder="邮箱/手机号码" autocapitalize="off" style="border: none;"></div>
                    <div class="input-field">
                      <input type="password" placeholder="请输入密码" autocapitalize="off" style="border: none;"></div>
                  </div>
                  <ul class="error-msg-list"></ul>
                  <button type="submit" class="signup-form__submit">登录</button>
                  <div class="signup-form-nav">
                    <div class="left">
                    </div>
                    <div class="right">
                      <a v-link="{name:'signupa'}">注册新账户</a>&nbsp;&nbsp;<a>忘记密码</a>
                    </div>
                  </div>
                </form>
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

    .signup-form {
        width: 300px;
        position: absolute;
        top: 20%;
        left: 50%;
        text-align: center;
        background-color: hsla(0, 0%, 100%, .92);
        width: 363px;
        margin-left: -181.5px;
        padding: 50px 0;
        border-radius: 4px
    }

    @media (max-width:540px) {
        .signup-form {
            top: 50px;
            width: 310px;
            margin-left: -155px;
            background-color: #eee
        }
    }

    .signup-form #g-recaptcha {
        margin: 0 auto;
        border-right: 1px solid #d3d3d3;
        overflow: hidden;
        box-sizing: border-box
    }

    .signup-form #g-recaptcha, .signup-form #kcaptcha img {
        width: 300px;
        border-radius: 4px
    }

    .signup-form .error-msg-list {
        list-style-type: none;
        padding-left: 0;
        margin: 8px auto
    }

    .signup-form .error-msg-list__item {
        width: 280px;
        background-color: rgba(0, 0, 0, .3);
        margin: 0 auto;
        margin-bottom: 2px;
        padding: 13px 10px;
        font-size: 14px;
        line-height: 1.5;
        color: #fff;
        text-align: left
    }

    .signup-form fieldset {
        width: 300px;
        margin: 0 auto;
        border: none;
        padding: 0
    }

    .signup-form legend {
        color: #4d4a4d;
        font-size: 14px;
        font-weight: 700;
        text-align: left;
        margin-bottom: 6px
    }

    .signup-form .note {
        font-size: 10px;
        width: 280px;
        box-sizing: border-box;
        margin: 0 auto;
        text-align: left;
        color: #999;
        border-top: 1px solid #eee;
        padding: 7px 0
    }

    .signup-form .input-field {
        position: relative;
        margin: 0 auto;
        width: 300px;
        padding: 0;
        border: 1px solid #dfebf2;
        background-color: #fff;
        border-radius: 4px
    }

    .signup-form .input-field input {
        width: 290px;
        height: 40px;
        color: #000;
        display: block;
        outline: 0;
        margin: 0;
        padding: 0;
        padding-left: 10px;
        line-height: normal
    }

    .signup-form .input-field input:placeholder-shown {
        color: #ccc
    }

    .signup-form .input-field input::-webkit-input-placeholder {
        color: #ccc
    }

    .signup-form .input-field input:-moz-placeholder, .signup-form .input-field input::-moz-placeholder {
        color: #ccc;
        opacity: 1
    }

    .signup-form .input-field input:-ms-input-placeholder, .signup-form .input-field input::-ms-input-placeholder {
        color: #ccc
    }

    .signup-form .input-field .valid {
        position: absolute;
        top: 20px;
        right: 10px;
        background-color: #91ea98;
        /*background-image: url(35ba32c85c3c4d3afdea1e1ce889e932.svg);*/
        width: 20px;
        height: 20px;
        border-radius: 10px;
        margin-top: -10px
    }

    .signup-form .input-field-group > .input-field {
        margin: 0 auto;
        margin-bottom: 0;
        border-radius: 0;
        border-bottom: none
    }

    .signup-form .input-field-group > .input-field:first-child {
        border-radius: 4px 4px 0 0
    }

    .signup-form .input-field-group > .input-field:last-child {
        border-radius: 0 0 4px 4px;
        border-bottom: 1px solid #dfebf2
    }

    .signup-form .signup-form__logo-box {
        margin-bottom: 40px
    }

    @media (max-width:540px) {
        .signup-form .signup-form__logo-box {
            margin-bottom: 24px
        }
    }

    .signup-form .signup-form__logo, .signup-form .signup-form__logo-booth {
        margin-bottom: 6px
    }

    .signup-form.popup {
        padding: 10px 0 50px
    }

    .signup-form.popup .signup-form__logo {
        background-size: contain;
        width: 82px;
        height: 32px;
        margin-bottom: 1px
    }

    .signup-form.popup .signup-form__logo-booth {
        background-size: contain;
        width: 82px;
        height: 32px;
        margin: 40px 0 1px
    }

    .signup-form__catchphrase {
        color: #757c80;
        font-size: 12px;
        font-weight: 700
    }

    .signup-form__catchphrase-booth {
        color: #757c80;
        margin: 0 0 42px;
        font-size: 20px;
        font-weight: 600
    }

    .signup-form__booth-icon {
        width: 172px;
        height: 34px;
        margin: 0 auto 8px;
        /*background-image: url(9e3ffaa509b0b143854c1ec2d7d4fb79.svg)*/
    }

    .signup-form__title {
        margin-top: -20px;
        margin-bottom: 20px;
        color: #757c80;
        font-size: 20px;
        font-weight: 700
    }

    .signup-form__information {
        margin-top: -16px;
        margin-bottom: 24px;
        color: #757c80;
        font-size: 12px
    }

    .signup-form__submit, .signup-form__submit--login, .signup-form__submit--login--short,
    .signup-form__submit--short {
        display: block;
        margin: 0 auto;
        margin-bottom: 8px;
        width: 300px;
        height: 40px;
        line-height: 40px;
        background-color: #25c6ff;
        color: #fff;
        font-weight: 700;
        outline: none
    }

    .signup-form__submit--login, .signup-form__submit--login--short {
        background-color: #6d7084
    }

    .signup-form__submit--login--short, .signup-form__submit--short {
        width: auto;
        padding: 0 12px
    }

    .toggle-button-box {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px
    }

    .signup-form__sns-btn-area {
        color: #666;
        font-size: 12px;
        width: 302px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 16px;
        padding: 20px 26px;
        background-color: #fff;
        border: 1px solid #dfebf2;
        border-radius: 4px
    }

    .signup-form__sns-btn-area .sns-button-list {
        margin-top: 14px
    }

    .signup-form__sns-btn-area .sns-button-list .btn-item {
        display: inline-block;
        margin: 0 2px
    }

    .signup-form__sns-btn-area .sns-button-list .btn-item:first-child {
        margin-left: 0
    }

    .signup-form__sns-btn-area .sns-button-list .btn-item:last-child {
        margin-right: 0
    }

    .signup-form-nav {
        list-style: none;
        width: 300px;
        margin: 0 auto;
        color: #666;
        font-size: 12px;
        overflow: hidden
    }

    .signup-form-nav a {
        color: #666;
        font-size: 12px;
        text-decoration: none
    }

    .signup-form-nav a:hover {
        text-decoration: underline
    }

    .signup-form-nav .left {
        width: 50%
    }

    .signup-form-nav .right {
        width: 50%;
        float: right;
        text-align: right
    }

    .signup-form-nav .right:after {
        clear: both;
        content: ''
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
