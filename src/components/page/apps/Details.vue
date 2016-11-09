<template>
    <div class="container">
        <h1 class="title"><back></back> 应用详情</h1>
        <hr>
        <div class="content">
            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="基本">
                    <basic></basic>
                </tab-item>
                <tab-item title="容器">
                    <container></container>
                </tab-item>
                <tab-item title="数据库">
                    <Database></Database>
                </tab-item>
                <tab-item title="域名">
                    <domain></domain>
                </tab-item>
                <tab-item @selected="startMonitorEvent" @deselected="stopMonitorEvent" title="监控">
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
    import Database from './details/DetailsDatabase.vue'
    import Domain from './details/DetailsDomain.vue'
    import Setting from './details/DetailsSetting.vue'
    import Container from './details/DetailsContainer.vue'
    import Back from '../../ui/Back.vue'

    export default{
        data () {
            return {
                containerId: null,
            }
        },
        ready () {
            this.$set('containerId', this.$route.query.containerId);
        },
        methods: {

            showid: function() {
                console.log(this.containerId);
            },

            startMonitorEvent: function() {
                this.$broadcast('start-monitor');
            },

            stopMonitorEvent: function() {
                this.$broadcast('stop-monitor');
            }

        },
        components: {
            Tab,
            TabItem,
            Monitor,
            Basic,
            Database,
            Domain,
            Setting,
            Container,
            Back
        }
    }
</script>
