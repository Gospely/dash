<template>
    <div class="container">
        <h1 class="title">登录绑定</h1>
        <hr>
        <div class="content">            
            
            <article class="media">
                <figure class="media-left">
                    <p class="image is-64x64">
                        <span style="font-size:50px"><i class="fa fa-wechat"></i></span>
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>微信</strong>
                            <br>
                            <div style="margin-top:5px" class="is-tip">腾讯公司于2011推出的即时通讯服务，支持发送语音短信、视频、图片和文字，并提供公众平台、朋友圈、消息推送等功能。</div>
                        </p>
                    </div>
                </div>
                <div class="media-right">
                    <button class="button is-danger">解除绑定</button>
                </div>
            </article>

            <hr>

            <article class="media">
                <figure class="media-left">
                    <p class="image is-64x64">
                        <span style="font-size:58px"><i class="fa fa-github"></i></span>
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                        <p>
                            <strong>Github</strong>
                            <br>
                            <div style="margin-top:5px" class="is-tip">Github于2008年上线，目前，主要服务是Git代码仓库托管及基本的Web管理界面。</div>
                        </p>
                    </div>
                </div>
                <div class="media-right">
                    <button class="button is-danger">解除绑定</button>
                </div>
            </article>

        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data () {
            return {
                msg: 'hello vue'
            }
        },
        components: {
        }
    }
</script>
