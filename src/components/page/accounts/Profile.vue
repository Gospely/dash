<template>
    <div class="container">
        <h1 class="title">个人信息</h1>
        <hr>
        <div class="content">

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">个人头像</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <img class="rounded-image" style="width:100px;height:100px" :src = "pictureUrl">
                    <file-input name = "file1" accept = "image/jpg;image/gif;image/png" @changed = "fileSelectedHandler">
                        <a class="button is-primary">选择图片</a>
                    </file-input>
                    <span class="help is-tip">支持 JPG, GIF, PNG 格式，文件小于 1M。</span>
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">用户名称</label>
              </div>
              <div class="control">
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="ivydom" v-model="username" disabled>
                    <i class="fa fa-lock"></i>
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">手机号码</label>
              </div>
              <div class="control">
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="请输入手机号码" v-model="phone" v-bind:disabled="!changeMobileState">
                    <i class="fa fa-check"></i>
                </p>
                <a @click="startChangeMobile" v-show="!changeMobileState" class="button is-primary" style="position:absolute;margin-left:15px"><i class="fa fa-pencil"></i></a>
                <a v-show="changeMobileState" @click="cancelChangeMobile" class="button is-primary" style="position:absolute;margin-left:15px"><i class="fa fa-close"></i></a>
              </div>
            </div>

            <div class="control is-horizontal user-center" v-show="changeMobileState">
              <div class="control-label">
                <label class="label">验证手机</label>
              </div>
              <div class="control">
                <p class="control has-icon has-icon-right">
                    <input class="input" type="text" placeholder="请输入短信验证码">
                    <i class="fa fa-check"></i>
                </p>
                <a class="button is-primary" style="position:absolute;margin-left:15px"><i class="fa fa-check"></i></a>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">邮箱帐号</label>
              </div>
              <div class="control">

                <p class="control has-icon has-icon-right">
                    <input class="input" type="email" placeholder="请输入邮箱帐号" v-model="email" v-bind:disabled="!isVerifingEmail">
                    <i class="fa fa-check"></i>
                </p>
                <a v-show="!isVerifingEmail" @click="verifyEmail" class="button is-primary" style="position:absolute;margin-left:15px"><i class="fa fa-pencil"></i></a>
                <a v-show="isVerifingEmail" @click="cancelVerifyEmail" class="button is-primary" style="position:absolute;margin-left:15px"><i class="fa fa-close"></i></a>
              </div>
            </div>

            <div class="control is-horizontal user-center" v-show="isVerifingEmail">
              <div class="control-label">
                <label class="label">验证邮箱</label>
              </div>
              <div class="control">

                <p class="control has-icon has-icon-right">
                    <input class="input" type="email" placeholder="请输入接收到的验证码">
                    <i class="fa fa-lock"></i>
                </p>

                <a @click="confirmVerifyEmail" class="button is-primary" style="position:absolute;margin-left:15px"><i class="fa fa-check"></i></a>
              </div>
            </div>
            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">更改密码</label>
              </div>
              <div class="control">
                <p class="control has-icon has-icon-right">
                    <input class="input" type="password" placeholder="密码" v-bind:disabled="!changePwState">
                    <i class="fa fa-lock"></i>
                </p>
                <a class="button is-danger" style="position:absolute;margin-left:15px" @click="startChangePw"><i class="fa fa-pencil"></i></a>
                <a v-show="changePwState" class="button is-primary" style="position:absolute;margin-left:55px"><i class="fa fa-check"></i></a>
              </div>
            </div>

            <div v-show="changePwState" class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">新的密码</label>
              </div>
              <div class="control">
                <p class="control has-icon has-icon-right">
                    <input class="input" type="password" placeholder="密码">
                    <i class="fa fa-lock"></i>
                </p>
              </div>
            </div>

            <div v-show="changePwState" class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">重复一次</label>
              </div>
              <div class="control">
                <p class="control has-icon has-icon-right">
                    <input class="input" type="password" placeholder="密码">
                    <i class="fa fa-lock"></i>
                </p>
              </div>
            </div>

            <hr>

        </div>
    </div>
</template>
<style>

</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'
    import FileInput from '../../ui/NiceFileInput.vue'

    export default{
        data () {
            var _self = this;
            services.UserService.userInfo('1').then(function(res) {

              if(res.status === 200) {
                var data = JSON.parse(res.body);
                _self.pictureUrl = data.fields.photo;
                _self.username = data.fields.name;
                _self.phone = data.fields.phone;
                _self.email = data.fields.email;

              }else {

              }
            }, function(err) {

            });
            return {
                  changePwState: false,
                  isVerifingEmail: false,
                  changeMobileState: false,
                  pictureFile: null,
                  pictureUrl: '',
                  username: '',
                  phone: '',
                  email: '',
              }
        },
        components: {
            Modal,
            FileInput
        },

        methods: {

            startChangePw: function() {
                this.changePwState = !this.changePwState;
            },

            verifyEmail: function() {
                this.isVerifingEmail = true;
            },

            cancelVerifyEmail: function() {
                this.isVerifingEmail = false;
            },

            confirmVerifyEmail: function() {


            },

            startChangeMobile: function() {
                this.changeMobileState = true;
            },

            cancelChangeMobile: function() {
                this.changeMobileState = false;
            },

            fileSelectedHandler: function(fileInput, event) {
                var self = this
                var files = fileInput.files
                if (files.length > 0) {
                    var file = files[0]
                    self.pictureFile = file.name
                    self.pictureUrl = window.URL.createObjectURL(file)
                }
            }

        }
    }
</script>
