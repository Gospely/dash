<template>
    <div class="container">
        <h1 class="title">应用详情</h1>
        <hr>
        <div class="content">
            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="基本">
                    <basic></basic>
                </tab-item>
                <tab-item title="容器">
                    <container></container>
                </tab-item>
                <tab-item title="域名">
                    <domain></domain>
                </tab-item>
                <tab-item title="监控">
                    <Monitor></Monitor>
                </tab-item>                
                <tab-item title="设置"> 
                    <setting></setting>
                </tab-item>
            </tab>

        </div>
    </div>
</template>
<style>
</style>
<script>
    import {Tab, TabItem} from '../../ui/Tab'
    import Monitor from './details/DetailsMonitor.vue'
    import Basic from './details/DetailsBasic.vue'
    import Domain from './details/DetailsDomain.vue'
    import Setting from './details/DetailsSetting.vue'
    import Container from './details/DetailsContainer.vue'

    export default{
        data () {
            return {
                containerId: null
            }
        },
        ready () {
            this.$set('containerId', this.$route.params.containerId);
        },
        methods: {

            showid: function() {
                console.log(this.containerId);
            }

        },
        components: {
            Tab,
            TabItem,
            Monitor,
            Basic,
            Domain,
            Setting,
            Container
        }
    }
</script>
