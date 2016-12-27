<template>
    <div class="container">
        <h1 class="title">服务列表</h1>
        <h2 class="subtitle">这里是<strong>dodora容器云</strong>官方提供的容器云集成服务</h2>
        <hr>
        <div class="content">
            <image-viewer></image-viewer>
        </div>
        <version-modal :versions="versions" :show-version-modal.sync="showVersionModal" :select-name="selectName" :select-description="selectDescription"></version-modal>
    </div>


</template>
<style>

</style>
<script>

    import ImageViewer from '../apps/ImageViewer.vue'
    import VersionModal from '../../ui/ChooseServicesVersion.vue'
    import {menu} from '../../../config'
    // let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                msg: 'hello vue',
                selectName: '',
                selectDescription: '',
                versions:[
                 ],
                showVersionModal:false
            }
        },
        components: {
            ImageViewer,
            VersionModal
        },

        methods:{
            selectThisVersion(item,index) {
                this.thisIndex = index;
            }
        },

        events: {
            'imageOnSelected': function(item) {
                console.log(item.id, item.type);

                if(item.type != 'application') {
                    this.showVersionModal = true;

                    services.Common.list({
                        url: 'images',
                        param: {
                            parent: item.id
                        },
                        target: 'versions',
                        ctx: this
                    });
                }else {

                    this.$router.go({
                        path: '/apps/new/',
                        query: {
                            imageId: this.selectName
                        }
                    });
                    menu['/apps'].isShowSubMenu = true;

                }

                this.selectName = item.id;
                this.selectDescription = item.description;

                sessionStorage.currentImage = JSON.stringify(item);
                // this.$router.go('/apps/new/' + item.name);
            },

            'selectThisVersion': function(item) {
                console.log(item.id);
                this.selectName = item.id;
                this.imageName = item.name + ":" +item.label;
                sessionStorage.currentImage = JSON.stringify(item);
            },

            comfirmVersion() {
                this.$router.go({
                    path: '/apps/new/',
                    query: {
                        imageId: this.selectName
                    }
                });
                menu['/apps'].isShowSubMenu = true;
            }
        }
    }
</script>
