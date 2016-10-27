<template>
    <div class="container">

        <div class="columns">
            
            <div class="column">
                <h5>CPU监控</h5>
                <chart :type = "'line'" :data = "CPUChartData"></chart>
                <hr>
            </div>

            <div class="column">
                <h5>内存监控</h5>
                <chart :type = "'line'" :data = "memoryChartData"></chart>
                <hr>
            </div>

            <div class="column">
                <h5>网络监控</h5>
                <chart :type = "'line'" :data = "netChartData"></chart>
                <hr>
            </div>

        </div>
    </div>
</template>
<style>
</style>
<script>
    import Chart from '../../../ui/Chart.vue'
    export default{
        data () {
            return {
                appId: "",
                msg: 'hello vue',

                network: {
                    inner: [],
                    outer: []
                },

                cpu: {
                    data: []
                },

                memory: {
                    data: []
                },

                timeLabel: [],

                interval: 0,

                start: false
            }
        },

        computed: {
            CPUChartData () {

                var self = this;

                return {
                    labels: self.timeLabel,
                    datasets: [{
                        label: 'CPU使用率 (%)',
                        backgroundColor: 'rgba(151, 187, 205, 0.5)',
                        borderColor: '#CCCCCC',
                        borderWidth: 2,
                        fill: true,
                        lineTension: 0,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255, 255, 255)',
                        pointBackgroundColor: '#97bbcd',
                        pointBorderWidth: 2,
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(255, 255, 255)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 2,
                        data: self.cpu.data
                    }]
                }
            },
            memoryChartData () {

                var self = this;

                return {
                    labels: self.timeLabel,
                    datasets: [{
                        label: '内存使用率 (%)',
                        backgroundColor: 'rgba(151, 187, 205, 0.5)',
                        borderColor: '#CCCCCC',
                        borderWidth: 2,
                        fill: true,
                        lineTension: 0,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255, 255, 255)',
                        pointBackgroundColor: '#97bbcd',
                        pointBorderWidth: 2,
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(255, 255, 255)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 2,
                        data: self.memory.data
                    }]
                }
            },
            netChartData () {

                var self = this;

                return {
                    labels: self.timeLabel,
                    datasets: [{
                        label: '入带宽 (kb/s)',
                        backgroundColor: 'rgba(237, 237, 237, 0.5)',
                        borderColor: '#CCCCCC',
                        borderWidth: 2,
                        fill: true,
                        lineTension: 0,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255, 255, 255)',
                        pointBackgroundColor: '#ededed',
                        pointBorderWidth: 2,
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(255, 255, 255)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 2,
                        data: self.network.inner
                    },{
                        label: '出带宽 (kb/s)',
                        backgroundColor: 'rgba(151, 187, 205, 0.5)',
                        borderColor: '#CCCCCC',
                        borderWidth: 2,
                        fill: true,
                        lineTension: 0,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255, 255, 255)',
                        pointBackgroundColor: '#97bbcd',
                        pointBorderWidth: 2,
                        pointHoverRadius: 3,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(255, 255, 255)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 4,
                        pointHitRadius: 2,
                        data: self.network.outer
                    }]
                }
            }
        },

        ready (){
            this.$set("appId", this.$route.params.containerId);
            var self = this;
        },

        events: {

            'start-monitor': function() {
                console.log('start');
                this.start = true;
                this.startMonitor();
            },

            'stop-monitor': function() {
                console.log('stop');
                this.start = false;
                this.stopMonitor();
            }

        },

        methods: {

            startMonitor: function() {
                if(this.start) {
                    this.interval = setInterval( () => {
                        this.stats();
                    }, 1000);       
                }
            },

            stopMonitor: function() {
                clearInterval(this.interval);
            },

            stats: function() {
                var self = this;
                console.log('stats');
                var option = {
                    param: {
                        containerName: self.appId,
                    },
                    cb: function(res) {
                        if(res.status == 200){
                            var data = res.data;

                            if(data.code == 200) {
                                var stats = JSON.parse(data.fields);
                                    
                                console.log(stats);

                                var time = stats.read.substring(11, 19);
                                console.log(time);
                                self.timeLabel.push(time);

                                if(self.timeLabel.length > 7) {
                                    self.timeLabel.splice(0, 1);
                                }

                                console.log(self.cpu.data, self.timeLabel);

                                //CPU
                                var totalCPU = stats.cpu_stats.system_cpu_usage;
                                var usage = stats.cpu_stats.cpu_usage.total_usage;
                                usage = ((usage / totalCPU) * 100).toFixed(2);
                                self.cpu.data.push(usage);

                                if(self.cpu.data.length > 7) {
                                    self.cpu.data.splice(0, 1);
                                }

                                //Memory

                                var memory = stats.memory_stats;
                                var totalMemory = memory.limit;
                                var usage = (memory.usage / totalMemory * 100).toFixed(2);
                                self.memory.data.push(usage);

                                if(self.memory.data.length > 7) {
                                    self.memory.data.splice(0, 1);
                                }

                                //Network

                                var network = stats.networks.eth0;
                                var rx = (network.rx_bytes / 1024).toFixed(2);
                                var tx = (network.tx_bytes / 1024).toFixed(2);

                                self.network.inner.push(rx);
                                self.network.outer.push(tx);

                                if(self.network.inner.length > 7) {
                                    self.network.inner.splice(0, 1);
                                    self.network.outer.splice(0, 1);
                                }

                            }else {
                                console.log(data.message);
                            }
                        }
                    },
                    url: "container/stats"
                };
                services.Common.containerOperate(option);
          },

        },

        components: {
            Chart
        }
    }
</script>
