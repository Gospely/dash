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
                msg: 'hello vue'
            }
        },

        computed: {
            CPUChartData () {
                return {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'CPU使用率',
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
                        data: [30, 45, 67, 83, 89, 64, 50]
                    }]
                }
            },
            memoryChartData () {
                return {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: '内存 (MB)',
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
                        data: [30, 45, 67, 83, 89, 64, 50]
                    }]
                }
            },
            netChartData () {
                return {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
                        data: [65, 59, 80, 81, 56, 55, 40]
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
                        data: [30, 45, 67, 83, 89, 64, 50]
                    }]
                }
            }
        },

        ready (){
            this.$set("appId", this.$route.params.containerId);
            this.$get('stats')();
        },

        methods: {
          stats: function(){
            var self = this;
            var option = {
                param: {
                    containerName: self.appId,
                },
                cb: function(res) {
                    console.log(res);
                    if(res.status == 200){
                        var data = res.data;

                        if(data.code == 200) {
                            var stats = JSON.parse(data.fields);
                                
                            console.log(stats);

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
