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
            history.go(-1);
            if(document.domain == 'localhost') {
                window.open("http://localhost:8989");
            }else {
                window.open("http://ide.gospely.com");
            }
        }
    }
</script>
