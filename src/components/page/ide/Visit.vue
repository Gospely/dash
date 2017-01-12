<template>
    <div class="container">
        <h1 class="title">访问Gospel集成开发环境</h1>
        <h2 class="subtitle">即将跳转，请稍候……</h2>
        <hr>
        <div class="content">

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
        },

        ready () {
            if(document.domain == 'localhost') {
                window.location.href = "http://localhost:8989";
                // history.go(-1);
            }else {
                window.location.href = "http://ide.gospely.com";
                // history.go(-1);
            }
        }
    }
</script>
