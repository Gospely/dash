<template>
    <div class="container">
        <h1 class="title">创建数据卷</h1>
        <h2 class="subtitle">数据卷服务是<strong>dodora容器云</strong>持久化数据、共享数据的存储空间</h2>
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
                isRefresh: false
            }
        },
        components: {
        },

        methods: {
            refreshAppList: function() {
                this.isRefresh = true;
            }
        }
    }
</script>
