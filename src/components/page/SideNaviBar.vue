<template>
    <div :class="['side-bar']">
        <div class="header-logo">
            <i class="fa fa-connectdevelop"></i>
        </div>
        <navi :model="menu" :collapsed.sync="collapsed" class="menu"></navi>
        <div class="sign-out" title="退出登录" @click="signOut()">
            <a href="#">
                <i class="fa fa-sign-out icon"></i
                ><span class="label">退出</span>
            </a>
        </div>
        <div class="user-info-link">
            <a href="#"></a>
        </div>
        <div class="collapse-nav" @click="toggleCollapse()">
            <i class="fa fa-angle-left"></i>
        </div>
    </div>
</template>
<style lang="scss">
    @import "./../../scss/_variable.scss";

    .sign-out .icon {
        margin: 0 18px 0 7px;
        width: 20px;
        vertical-align: middle;
        display: inline-block;
        line-height: 24px;
        text-align: center;
    }

    .sign-out .label {
        margin: 0;
        color: inherit;
        font-weight: normal;
        vertical-align: middle;
        display: inline-block;
        line-height: 24px;
        text-align: center;
    }

    .sign-out:hover,.sign-out a:hover {
        color: $color_side_bar_light;
        background: $bg_side_bar_hover;
    }

    .sign-out{
        position: relative;
        left: 0;
        width: 100%;
        height: 38px;
        padding: 7px 15px;
        line-height: 24px;
        overflow: hidden;
        cursor:pointer;
        font-size:100%;
    }

    .header-logo {
        position: relative;
        height: 58px;
        width: 100%;
        text-align: center;
        line-height: 58px;
        overflow: hidden;
        background-color: $bg_side_bar_light;
        .fa-connectdevelop{
            color: $bg_side_bar_light;
            font-size: 0px;
            vertical-align: middle;
            background-image: url(http://i68.tinypic.com/2md5v76.png);
            background-position: center center;
            background-size: 70%;
            background-repeat: no-repeat;
            width: 80%;
            height: 80%;
        }
    }

    .side-bar {
        position: fixed;
        transition: all;
        transition-duration: 300ms;
        height: 100%;
        background: $bg_side_bar;
        color: $color_side_bar;
        z-index: 99;
        .menu {
            top: 0;
            width: 100%;
            li a {
                display: block;
                width: 100%;
                height: 38px;
                padding: 7px 15px;
                line-height: 24px;
                overflow: hidden;
                .icon {
                    margin: 0 20px 0 5px;
                    width: 20px;
                }
                .label {
                    margin: 0;
                    color: inherit;
                    font-weight: normal;
                }
                .icon, .label, .collapse {
                    vertical-align: middle;
                    display: inline-block;
                    line-height: 24px;
                    text-align: center;
                }
                .collapse {
                    width:24px;
                    transition: all .5s ease;
                }
                .collapse.expanded {
                    transform: rotate(-90deg);
                }
            }
            li a.active, li a:hover {
                color: $color_side_bar_light;
                background: $bg_side_bar_hover;
            }
        }
        .user-info-link {
            position: absolute;
            left: 0;
            bottom: 40px;
            width: 100%;
            height: 54px;
            line-height: 54px;
        }
        .collapse-nav {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: $bg_side_bar_light;
            color: $color_side_bar_light;
            text-align: center;
            cursor: pointer;
        }
        .sub-menu {
            padding-left: 45px;
        }
    }

    @media (max-width: $l_sidebar_breakpoint) {
        .side-bar {
            width:0;
            transition: all 0.5s;
        }

    }

    .collapsed .side-bar {
         width: $l_sidebar_width_collapse!important;
    }

    .collapse-nav .fa-angle-left {
        transition: all;
        transition-duration: .3s;
        vertical-align: middle;
    }

    .collapsed .collapse-nav .fa-angle-left{
        transform: rotate(180deg);
    }

    @media screen and (min-width: $l_sidebar_breakpoint) {
        .side-bar {
            width: $l_sidebar_width_normal;
        }


   }

   .collapsed .side-bar .sub-menu{
       display: none;
   }

</style>
<script>
    import {menu} from '../../config'
    import Navi from '../ui/Navi.vue'
    import cookie from '../../lib/cookies'

    export default{
        props: {
            collapsed: {
                required: true,
                type: Boolean
            }
        },
        data () {
            return {
                menu: menu
            }
        },
        methods: {
            signOut(){
                services.Common.list({
                    url: 'users/logout',
                    param: {
                        token: localStorage.token
                    }
                });
                localStorage.removeItem('token');
                cookie.setCookie('token','','Thu, 01 Jan 1970 00:00:00 GMT');
                cookie.setCookie('user','','Thu, 01 Jan 1970 00:00:00 GMT');
                this.$router.go('/accounts/login');
            },
            toggleCollapse () {
                this.collapsed = !this.collapsed;
            }
        },
        components: {
            'navi': Navi
        }
    }
</script>
