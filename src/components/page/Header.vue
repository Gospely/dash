<template>
    <nav class="nav header-bar">
        <div class="nav-left">

        </div>
        <div class="nav-center">
            <a class="nav-item" href="https://github.com/Gospely">
              <span class="icon">
                <i class="fa fa-wechat"></i>
              </span>
            </a>
            <a class="nav-item" href="https://github.com/Gospely">
              <span class="icon">
                <i class="fa fa-weibo"></i>
              </span>
            </a>
        </div>
        <div id="nav-menu" class="nav-right nav-menu">
            <a class="nav-item " href="/">
                主页
            </a>
            <a class="is-hidden nav-item" href="/templates/">
                <span>Templates</span>
                <span class="tag is-small is-success">New!</span>
            </a>
            <a class="nav-item " href="/blog/">
                社区
            </a>
            <a class="nav-item " href="/blog/">
                文档
            </a>
        </div>
    </nav>
</template>
<style lang="scss">
    .header-bar {
        background: #fff;
        height: 58px;
        line-height: 58px;
        font-size: 14px;
        padding: 0 0 0 15px;
        text-align: left;
    }
</style>
<script>
    export default{
        data () {
            return {}
        }
    }
</script>
