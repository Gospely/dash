<template>
    <div class="container">
        <h5>CPU监控</h5>
        <chart :type = "'line'" :data = "CPUChartData"></chart>

        <hr>

        <h5>内存监控</h5>
        <chart :type = "'line'" :data = "CPUChartData"></chart>

        <hr>

        <h5>网络监控</h5>
        <chart :type = "'line'" :data = "CPUChartData"></chart>        
    </div>
</template>
<style>
</style>
<script>
    import Chart from '../../ui/Chart.vue'
    export default{
        data () {
            return {
                msg: 'hello vue'
            }
        },

        computed: {
            CPUChartData () {
                return {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'CPU使用量',
                        backgroundColor: '#FF6384',
                        borderColor: '#CCCCCC',
                        borderWidth: 1,
                        fill: false,
                        lineTension: 0,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#FF6384',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 8,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }]
                }
            }
        },

        components: {
            Chart
        }
    }
</script>
