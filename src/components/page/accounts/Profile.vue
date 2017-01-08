<style>

@media screen and (max-width: 769px) {
    .button-right {
        position: relative;
        left: 10px;
    }
    .button-right-two {
        position: relative;
        left: 20px;
    }
    .input-left {
        width: 85%;
        display: inline-block;
    }
}

@media screen and (min-width: 769px) {
    .button-right {
        position: absolute;
        left: 205px
    }
    .button-right-two {
        position: absolute;
        left: 255px;
    }
}

@media screen and (max-width: 769px) {
    .input-left {
        width: 75%;
        display: inline-block;
    }
}

@media screen and (max-width: 360px) {
    .input-left {
        width: 60%;
        display: inline-block;
    }
}

</style>

<template>

<div class="container">
    <h1 class="title">个人信息</h1>
    <hr>
    <div class="content" v-show="profileLoaded">

        <div class="control is-horizontal user-center">
            <div class="control-label">
                <label class="label">个人头像</label>
            </div>
            <div class="control is-grouped">
                <p class="control is-expanded">
                    
                    <file-input name="file1" accept="image/jpg;image/gif;image/png" @changed="fileSelectedHandler">
                        <img class="rounded-image" style="width:100px;height:100px;cursor:pointer" :src="photo">
                    </file-input>
                    <span class="help is-tip">支持 JPG, GIF, PNG 格式，文件小于 1M。</span>
                    <button class="button is-primary" v-show="isUploadPhoto" :disabled="uploading" @click="uploadPhoto">确定</button>
                </p>

            </div>
        </div>

        <hr>

        <div class="control is-horizontal user-center">
            <div class="control-label">
                <label class="label">用户名称</label>
            </div>
            <div class="control">
                <p class="control input-left has-icon has-icon-right">
                    <input class="input" type="text" placeholder="您的用户名" v-model="name" disabled>
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
                <p class="control input-left has-icon has-icon-right">
                    <input class="input" type="text" placeholder="请输入手机号码" v-model="phone" v-bind:disabled="!changeMobileState">
                    <i class="fa fa-check"></i>
                </p>
                <a @click="startChangeMobile" v-show="!changeMobileState" class="button-right button is-primary"><i class="fa fa-pencil"></i></a>
                <a v-show="changeMobileState" @click="cancelChangeMobile" class="button button-right is-primary"><i class="fa fa-close"></i></a>
                <a v-show="changeMobileState" @click="sendPhoneCode" title="发送验证码" class="button button-right-two is-primary" v-bind:class="{ 'is-disabled': stop}"><i class="fa fa-arrow-right">{{timevalue}}</i></a>
            </div>
        </div>

        <div class="control is-horizontal user-center" v-show="changeMobileState">
            <div class="control-label">
                <label class="label">验证手机</label>
            </div>
            <div class="control">
                <p class="control input-left has-icon has-icon-right">
                    <input class="input" type="text" v-model="phoneCode" placeholder="请输入短信验证码">
                    <i class="fa fa-check"></i>
                </p>
                <a class="button button-right is-primary" @click="confirmVerifyPhone"><i class="fa fa-check"></i></a>
            </div>
        </div>

        <hr>

<!--         <div class="control is-horizontal user-center">
            <div class="control-label">
                <label class="label">邮箱帐号</label>
            </div>
            <div class="control">

                <p class="control input-left has-icon has-icon-right">
                    <input class="input" type="email" placeholder="请输入邮箱帐号"  v-model="email" v-bind:disabled="!isVerifingEmail">
                    <i class="fa fa-check"></i>
                </p>
                <a v-show="!isVerifingEmail" @click="verifyEmail" class="button button-right is-primary"><i class="fa fa-pencil"></i></a>
                <a v-show="isVerifingEmail" @click="cancelVerifyEmail" class="button button-right is-primary"><i class="fa fa-close"></i></a>
                <a v-show="isVerifingEmail" @click="sendEmailCode" title="发送验证码" class="button button-right-two  is-primary"><i class="fa fa-arrow-right"></i></a>
            </div>
        </div>

        <div class="control is-horizontal user-center" v-show="isVerifingEmail">
            <div class="control-label">
                <label class="label">验证邮箱</label>
            </div>
            <div class="control">

                <p class="control input-left has-icon has-icon-right">
                    <input class="input" type="email" v-model="emailCode" placeholder="请输入接收到的验证码">
                    <i class="fa fa-lock"></i>
                </p>

                <a @click="confirmVerifyEmail" class="button button-right is-primary"><i class="fa fa-check"></i></a>
            </div>
        </div>
        <hr> -->

        <div class="control is-horizontal user-center" style="overflow: initial;">
            <div class="control-label">
                <label class="label">更改密码</label>
            </div>
            <div class="control" style="overflow: initial;">
                <p v-show="!changePwState" class="control input-left has-icon has-icon-right">
                    <input class="input" type="password" placeholder="密码" v-bind:disabled="!changePwState">
                    <i class="fa fa-lock"></i>
                </p>
                <p  class="help" v-show="changePwState">密码长度不能小于6位</p>
                <a class="button button-right is-danger" @click="startChangePw"><i class="fa fa-pencil"></i></a>
                <a v-show="changePwState" @click="confirmUpdatePwd" class="button button-right-two is-primary"><i class="fa fa-check"></i></a>
            </div>
        </div>

        <div v-show="changePwState" class="control is-horizontal user-center">
            <div class="control-label">
                <label class="label">新的密码</label>
            </div>
            <div class="control">
                <p class="control input-left has-icon has-icon-right">
                    <input class="input" type="password" v-model="password" placeholder="新的密码">
                    <i class="fa fa-lock"></i>
                </p>
            </div>
        </div>

        <div v-show="changePwState" class="control is-horizontal user-center">
            <div class="control-label">
                <label class="label">重复一次</label>
            </div>
            <div class="control">
                <p class="control input-left has-icon has-icon-right">
                    <input class="input" type="password" v-model="rePwd" placeholder="重复密码">
                    <i class="fa fa-lock"></i>
                </p>
            </div>
        </div>

        <hr>

    </div>
    <loading v-show="!profileLoaded"></loading>
</div>

</template>

<script>

import Vue from 'vue'
import Modal from '../../ui/Modal/Modal.vue'
import FileInput from '../../ui/NiceFileInput.vue'

export default {
    data() {
        var _self = this;
        var options = {
            param: {
                id: currentUser
            },
            url: "users",
            ctx: _self,

            cb: function(res) {
                console.log(res);
                var data = res.data.fields;
                _self.name = data.name;
                _self.phone = data.phone;
                _self.email = data.email;
                _self.token = localStorage.token;
                _self.photo = data.photo;

                _self.profileLoaded = true;
            }
        }
        services.Common.getOne(options);

        return {
            changePwState: false,
            isVerifingEmail: false,
            changeMobileState: false,
            pictureFile: null,
            photo: '',
            isUploadPhoto: false,
            uploading: false,
            name: '',
            phone: '',
            email: '',
            rePwd: '',
            password: '',
            emailCode: '',
            phoneCode: '',
            timevalue: "发送验证码",
            timer: 60,
            stop: false,
            token: '',

            profileLoaded: false
        }
    },

    created () {

    },

    components: {
        Modal,
        FileInput
    },

    methods: {
        btnChange: function() {
            var self = this;
            if (this.timer == 0) {
                this.stop = false;
                this.timevalue = "重新发送";
                this.timer = 60;
            } else {
                this.stop = true;
                this.timevalue = "重新发送(" + this.timer + ")";
                this.timer--;
                setTimeout(function() {
                    self.btnChange();
                }, 1000)
            }
        },
        sendPhoneCode: function() {
            notification.alert('封测阶段暂不开放手机号验证！');
            this.cancelChangeMobile();
            return false;

            var user = {
                phone: this.phone
            }
            services.UserService.sendPhoneCode(user).then(function(res) {
                if (res.status === 200) {
                    notification.alert('发送验证码成功');
                }
            }, function(err) {
                console.log(err);
                notification.alert('服务器异常');
            });
            this.btnChange();
        },
        confirmVerifyPhone: function() {

            var self = this;
            var user = {
                id: currentUser,
                token: this.token,
                authCode: this.emailCode,
                phone: this.phone
            }
            services.UserService.confirmVerifyPhone(user).then(function(res) {
                if (res.status === 200) {
                    var data = res.data;
                    if (data.code == 1) {
                        notification.alert('手机验证成功');
                        self.changeMobileState = false;
                    } else {
                        notification.alert(data.message);
                    }
                }
            }, function(err) {
                console.log(err);
                notification.alert('服务器异常');
            });
        },
        startChangePw: function() {
            this.changePwState = !this.changePwState;
        },
        verifyEmail: function() {
            this.isVerifingEmail = true;
        },

        cancelVerifyEmail: function() {
            this.isVerifingEmail = false;
        },
        checkPhone: function() {

            var _self = this;
            var options = {
                url: "users",
                param: {
                    phone: _self.phone
                },
                cb: function(res) {
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == -1) {
                            notification.alert('该手机已注册');
                            _self.phone = '';
                        }
                    }
                }
            };
            var re = /^1[34578]\d{9}$/;
            if (re.test(_self.phone)) {

            }

            if (_self.phone != null && _self.phone != '' && _self.phone != undefined) {
                services.Common.validator(options);
            }
        },
        checkEmail: function() {
          var _self = this;
          var options = {
              url: "users",
              param: {
                  email: _self.phone
              },
              cb: function(res) {
                  if (res.status == 200) {
                      var data = res.data;
                      if (data.code == -1) {
                          console.log(data);
                          notification.alert('该手机已注册');
                          _self.email = '';
                      }
                  }
              }
          };
          var re = /^1[34578]\d{9}$/;
          if (re.test(_self.email)) {

          }

          if (_self.email != null && _self.email != '' && _self.email != undefined) {
              services.Common.validator(options);
          }
        },
        sendEmailCode: function() {
            var user = {
                email: this.email
            }

            if(this.email == '') {
                notification.alert('请输入完整的邮箱地址');
                return false;
            }

            var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if(!emailReg.test(this.email)) {
                notification.alert('请输入正确的邮箱地址');
                return false;
            }

            var self = this;
            services.UserService.sendEmailCode(user).then(function(res) {
                if (res.status === 200) {
                    self.token = res.data.fields;
                    notification.alert('发送验证码成功');
                }
            }, function(err) {
                console.log(err);
                notification.alert('服务器异常');
            });
        },

        confirmVerifyEmail: function() {

            var self = this;
            var user = {
                id: currentUser,
                token: this.token,
                authCode: this.emailCode,
                phone: this.email,
            }
            services.UserService.confirmVerifyEmail(user).then(function(res) {
                if (res.status === 200) {
                    var data = res.data;
                    if (data.code == 1) {
                        notification.alert('修改邮箱成功');
                        self.isVerifingEmail = false;
                    } else {
                        notification.alert(data.message);
                    }
                }
            }, function(err) {
                console.log(err);
                notification.alert('服务器异常');
            });
        },

        startChangeMobile: function() {
            notification.alert('抱歉，封测期间暂不提供手机绑定服务')
            this.changeMobileState = false;
        },

        cancelChangeMobile: function() {
            this.changeMobileState = false;
        },

        confirmUpdatePwd: function() {
            var user = {
                id: currentUser,
                password: this.password
            };

            if(this.password == '' || this.rePwd == '') {
                notification.alert('请输入完整密码');
                return false;
            }

            if(this.password.length < 6 || this.rePwd.length < 6) {
                notification.alert('密码长度不能小于6位');
                return false;
            }

            if(this.password != this.rePwd) {
                notification.alert('请输入相同的密码')
                return false;
            }

            services.UserService.updatePwd(user).then(function(res) {
                if (res.status === 200) {
                    notification.alert('修改密码成功');
                }
            }, function(err) {
                notification.alert('服务器异常');
            });
        },

        fileSelectedHandler: function(fileInput, event) {
            var self = this;
            var files = fileInput.files;
            if (files.length > 0) {
                self.isUploadPhoto = true;
                var file = files[0];
                self.pictureFile = file.name;
                self.pictureUrl = window.URL.createObjectURL(file);

                //图片转base64
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    self.photo = this.result;
                }

            }
        },

        uploadPhoto: function () {
            var self = this;
            self.uploading = true;
            var user = {
                id: currentUser,
                photo: self.photo
            }
            services.UserService.uploadHead(user).then(function(res) {

                if (res.status === 200) {
                    self.uploading = false;
                    self.isUploadPhoto = false;
                    notification.alert('修改头像成功');
                }
            }, function(err) {
                notification.alert('服务器异常');
                self.uploading = false;
            });
        }

    }
}

</script>
