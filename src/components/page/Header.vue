<template>
    <nav class="my-nav header-bar">

        <div class="my-nav-left">
            <i v-bind:class="['fa','fa-angle-right',{'isOpen':hiddened},{'iconHiddened':collapsed}]" @click="toggleMenu"></i>
        </div>

        <div class="my-nav-center">
            <a class="my-nav-item" href="https://github.com/Gospely">
              <span class="icon">
                <i class="fa fa-wechat"></i>
              </span>
            </a>
            <a class="my-nav-item" href="https://github.com/Gospely">
              <span class="icon">
                <i class="fa fa-weibo"></i>
              </span>
            </a>
        </div>

        <div id="nav-menu" class="my-nav-right">
            <a class="my-nav-item" @click="signOut()">
                退出
            </a>
        </div>
    </nav>
</template>
<style>
    /*@import "../../scss/variable";

    @media (max-width: $l_sidebar_breakpoint) {
        .nav-left .fa-angle-right{
            display:block;
        }
    }

    @media (min-width: $l_sidebar_breakpoint) {
        .nav-left .fa-angle-right{
            display:none;
        }
    }*/

    .my-nav-left,.my-nav-center,.my-nav-right {
        width: 33.3%;
        float: left;
        line-height: 58px;
        height: 100%;
    }
    .my-nav-center{
        text-align: center;
    }
    .my-nav-center .icon {
        vertical-align: middle;
    }
    .my-nav-right {
        text-align: right;
        padding-right: 10px;
    }
    .my-nav-item {
        color: #69707a;
        padding: 10px;
    }
    .my-nav-item:hover {
        color: #222324;
    }
    @media screen and (min-width: 1024px){
        .my-nav-left .fa-angle-right{
            display: none;
        }
     }

     @media screen and (max-width: 1024px){
        .my-nav-left .fa-angle-right{
            display: block;
        }
     }
    .isOpen{
        transition: all .3s;
        transform: rotate(180deg);
    }

    .my-nav-left .iconHiddened{
        display: none;
    }


    .header-bar {
        background: #fff;
        height: 58px;
        line-height: 58px;
        font-size: 14px;
        padding: 0 0 0 15px;
        text-align: left;
    }

    .my-nav-left .fa-angle-right{
        font-size: 50px;
        color: #69707a;
        cursor: pointer;
        width: 50px;
    }

    .signup-form {
        width: 300px;
        position: absolute;
        top: 5%;
        left: 50%;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.92);
        width: 363px;
        margin-left: -181.5px;
        padding: 50px 0;
        border-radius: 4px;
        font-size: 16px;
    }

    .logo, .signup-form__logo {
        display: inline-block;
        width: 180px;
        height: 70px;
        background-image: url(http://i65.tinypic.com/zm0gns.png);
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
    }

    .radius-flat-rectangle, .btn-sns, .btn-gplus, .btn-facebook, .btn-twitter, .btn-weibo, .signup-form__submit, .signup-form__submit--login { border: none; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; }

    .btn, .btn-sns, .btn-gplus, .btn-facebook, .btn-twitter, .btn-weibo, .signup-form__submit, .signup-form__submit--login { cursor: pointer; display: inline-block; text-align: center; text-decoration: none; }

    .btn-sns, .btn-gplus, .btn-facebook, .btn-twitter, .btn-weibo { width: 80px; height: 40px; margin-top: 10px; }

    @media (max-width 540px) {
        .signup-form {
            top: 50px;
            width: 310px;
            margin-left: -160px;
            background-color: #eeeeee;
            }
        }

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

    .notification.noty {
        position: absolute;
        width: 280px;
        right: 20px;
        top: 20px;
        z-index: 6550;
    }

    .global-laoder {
        position: fixed!important;
        left: 0px;
        z-index: 65555;
        width: 100%;
    }
</style>
<script>
    export default{
        props: {
            hiddened: {
                required: true,
                type: Boolean
            },
            collapsed:{
                required: true,
                type: Boolean
            }
        },
        data () {
            return {
                iconHiddened:true
            }
        },
        methods:{
            signOut(){
                localStorage.removeItem('token');
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                this.$router.go("/accounts/login");
            },
            toggleMenu () {
                this.hiddened = !this.hiddened;
            }
        },
        ready: function () {
            // window.onresize = function () {
            //     if (document.body.clientWidth <= 1024) {
            //         this.iconHiddened = true;
            //     }
            // }
        }
    }
</script>
