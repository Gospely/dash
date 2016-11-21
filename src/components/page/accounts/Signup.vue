<template>
    <div class="container">
        <bg></bg>
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
                
            }
        },
        components: {
            bg
        },

        methods: {
            
        }
    }
</script>
