<template>
    <div class="container">
        <h1 class="title">服务列表</h1>
        <h2 class="subtitle">这里是<strong>dodora容器云</strong>官方提供的容器云集成服务</h2>
        <hr>
        <div class="content">
            <image-viewer></image-viewer>
        </div>
    </div>
</template>
<style>
</style>
<script>

    import ImageViewer from '../apps/ImageViewer.vue'

    export default{
        data () {
            return {
                msg: 'hello vue'
            }
        },
        components: {
            ImageViewer
        },

        events: {
            'imageOnSelected': function(item) {
                sessionStorage.currentImage = JSON.stringify(item);
                this.$router.go('/apps/new/' + item.id);
            }
        }
    }
</script>
