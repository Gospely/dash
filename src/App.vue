<template>
    <div id="app" :class="{'collapsed':collapsed}">
        <div class="validation-email" @click="validationEmail"  v-show='isValidator'>
            <p>请尽快验证邮箱! 点击重新发送验证邮件</p>
        </div>
        <side-navi :collapsed.sync="collapsed" :class="{'hiddened':hiddened}"></side-navi>
        <progress id="global-loader" v-show="false" class="progress is-info" style="position: fixed!important;left: 0px;z-index: 65555;width: 100%;height: 4px;" value="{{loaderProgress}}" max="100"></progress>
        <section :class="['app-main',{'body-hiddened':hiddened}]">
            <div class="app-main-header">
                <header-bar :hiddened.sync="hiddened" :collapsed.sync="collapsed"></header-bar>
            </div>
            <div class="app-main-body">
                <div class="container">
                    <router-view></router-view>
                </div>
            </div>
        </section>
        <div class="fuck"></div>
        <div class="loader-wrapper">
            
            <div class="loader">
                <div class="loader-inner ball-pulse-sync">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import SideNaviBar from 'components/page/SideNaviBar.vue'
    import HeaderBar from 'components/page/Header.vue'

    export default {
        data () {
            return {
                collapsed: false,
                hiddened: false,
                loaderProgress: 0,
                isValidator: localStorage.getItem('isActive')
            }
        },
        ready () {
            this.appMainBody = this.$el.getElementsByClassName('app-main-body')[0];

            var inter = setInterval(function() {
                var container = document.querySelector('.container').childNodes;
                if(container.length > 0) {
                    $('.loader-wrapper').addClass('animated bounceOutDown');
                    clearInterval(inter);
                }
            }, 1000);

        },
        watch: {
            '$route.name': {
                handler: function (val, oldVal) {
                    console.log('older: %s,new: %s', val, oldVal)
                }
            }
        },
        methods:{
            validationEmail(){
                this.$router.replace('/accounts/profile');
            }
        },
        components: {
            HeaderBar,
            'side-navi': SideNaviBar
        }
    }
</script>
<style lang="scss">
    @import "scss/variable";
    @import "scss/app";

    #app .body-hiddened{
        margin-left:230px;
    }

    #app .collapsed .body-hiddened{
        margin-left:60px;
    }

    .validation-email {
        // background-color: #ffdd57;
        width: 100%;
        z-index: 9217893;
        text-align: center;
        // color: #69707a;
        cursor: pointer;
        background-color: #fcf8e3;
            border-color: #faebcc;
            color: #8a6d3b;
            border-bottom: 1px solid #faebcc;
            padding: 8px;
    }
    .validation-email:hover {
        background-color: #fcf8a0;
        color: #69707a;
    }
    .app-main {
        position: relative;
        display: block;
        height: 100vh;
        transition: all .3s;
    }

    .app-main-header {
        position: relative;
        z-index: 99;
    }

    .app-main-body {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 15px 15px 15px 15px;
        background: $bg_app_main;
        z-index: 100;
        overflow-y: auto;
    }

    .app-main-body > * {
        margin: 0 auto;
        position: relative;
        width: 100%;
        min-height: 100%;
        background: #fff;
        padding: 10px;
    }

    @media (max-width: $l_sidebar_breakpoint) {
        .app-main {
            margin-left: 0;
        }
    }

    @media (min-width: $l_sidebar_breakpoint) {
        .app-main {
            margin-left: 230px;
        }

    }

    .collapsed .app-main {
        margin-left: 60px!important;
    }

    #app .hiddened{
        width:230px;
        transition: all 0.3s;
    }

    .content ul {
        margin-left: 0px;
        margin-right: 0px;
    }

    .tab-headers li:first-child {
        margin-top: 4px;
    }

    .tab-items {
        padding: 0px!important;
    }

    .table td.is-icon .fa {
        font-size: 18px;
    }

    .tabs table a {
        border-bottom: 0px!important;
    }

    .basic-wrapper {
        padding: 15px;
    }

    .back {
        cursor: pointer;
    }

    .docker-config-box {
        width: 90px;
        margin-right: 20px;
        float: left;
        cursor: pointer;
        overflow: hidden;
        background: #f7fafc;
        color: #666;
        border: 1px solid #d3d6db;
        margin-bottom: 10px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
    }

    .down-style {
        position: relative;
        width: 100%;
        height: 36px;
        background: #c9caca;
        line-height: 36px;
        text-align: center;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        font-weight: 600;
    }

    .text-center {
        text-align: center;
    }

    .parameter {
        font-size: 12px;
        color: #999;
    }

    .docker-config-box.active .down-style {
        background: #3690ef!important;
        color: #fff;
    }

    .docker-config-box.active .parameter {
        color: #3690ef!important;
    }

    .split {
        margin: 10px 0;
    }

    .user-center .control-label{
        text-align: left;
    }

    .user-center .control-label .label{
        font-weight: 200;
    }

    .is-tip {
        color: #777;
    }

    .is-big {
        font-size: 18px;
    }

    .rounded-image{
        border-radius: 50%;
    }

    .team {
        display: block;
        width: 100%;
    }

    .team .media {
        width: 100%;
    }

    .spinner {
      margin: 100px auto 0;
      width: 150px;
      text-align: center;
    }

    .spinner > div {
      width: 30px;
      height: 30px;
      background-color: #67CF22;

      border-radius: 100%;
      display: inline-block;
      -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
      animation: bouncedelay 1.4s infinite ease-in-out;
      /* Prevent first frame from flickering when animation starts */
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }

    .spinner .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .spinner .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0.0) }
      40% { -webkit-transform: scale(1.0) }
    }

    @keyframes bouncedelay {
      0%, 80%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 40% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }

    .ball-pulse-sync > div {
      background-color: #fff;
      width: 15px;
      height: 15px;
      border-radius: 100%;
      margin: 2px;
      -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
      display: inline-block; }

    .loader-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        z-index: 65535;
        background: #3f5267;
        display: flex;
        align-items: center;
        justify-content: center; 
    }

    .loader {
        box-sizing: border-box;
        display: flex;
        max-width: 25%;
        height: 200px;
        width: 200px;
        align-items: center;
        justify-content: center; 
        animation: spin-around 800ms infinite linear;
    }


</style>
