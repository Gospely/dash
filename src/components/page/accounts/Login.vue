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
                      <a v-link="{name:'signupa'}">注册新账户</a>&nbsp;&nbsp;<a @click="showForgotPwForm = true">忘记密码</a>
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

</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'

    export default{
        data () {
            return {
                showForgotPwForm: false,
                hasSent: false
            }
        },
        components: {
            Modal
        },

        methods: {
            sendCode: function() {
                this.hasSent = true;
            },

            confirmVerify: function() {

            }
        }
    }
</script>
