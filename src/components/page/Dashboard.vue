<template>
    <section class="section content">

        <h2>部署的应用</h2>
        <div class="columns">
            <div class="column">
                <div class="notification is-success has-text-centered">
                    <p class="title">应用</p>
                    <p class="subtitle">{{applicationsCount}}</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-info has-text-centered">
                    <p class="title">域名</p>
                    <p class="subtitle">{{domainsCount}}</p>
                </div>
            </div>
            <div class="column">
                <div class=" notification is-warning has-text-centered">
                    <p class="title">运行中</p>
                    <p class="subtitle">{{application_running}}</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-danger has-text-centered">
                    <p class="title">已停止</p>
                    <p class="subtitle">{{application_stop}}</p>
                </div>
            </div>
        </div>

        <h2>集成开发环境</h2>
        <div class="columns">
            <div class="column is-one-third">
                <p class="notification has-text-centered">
                    <span class="title">版本<br><span class="subtitle">{{version}}</span></span>
                </p>
            </div>
            <div class="column">
                <p class="notification has-text-centered">
                    <span class="title">到期时间<br><span class="subtitle">无限</span></span>
                </p>
            </div>
        </div>

        <h2>IDE运行环境 配额信息</h2>
        <div class="columns">
            <div class="column">
                <p class="notification has-text-centered">
                    <span class="title">内存<br><span class="subtitle">10G</span></span>
                </p>
            </div>
            <div class="column">
                <p class="notification has-text-centered">
                    <span class="title">CPU<br><span class="subtitle">2核</span></span>
                </p>
            </div>
            <div class="column is-half">
                <p class="notification has-text-centered">
                    <span class="title">数据卷大小<br><span class="subtitle">10G</span></span>
                </p>
            </div>
            <div class="column">
                <p class="notification has-text-centered">
                    <span class="title"><a class="button is-primary">提升配额</a><br><span class="subtitle">数据卷配额</span></span>
                </p>
            </div>
        </div>

        <h2>Dodora容器云 配额信息</h2>
        <div class="columns">
            <div class="column">
                <p class="notification has-text-centered">
                    <span class="title">数据卷<br><span class="subtitle">使用图表展示</span></span>
                </p>
            </div>
        </div>
<!--         <div class="columns">
            <div class="column is-half">
                <div class="box">
                    <h3>Doughnut Chart</h3>
                    <div>
                        <chart type="doughnut" :data="dynamicDoughnutData"></chart>
                    </div>
                </div>
            </div>
            <div class="column is-half">
                <div class="box">
                    <h3>Bar Chart</h3>
                    <div>
                        <chart type="bar" :data="barData"></chart>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-half">
                <div class="box">
                    <h3>Radar Chart</h3>
                    <div>
                        <chart type="radar" :data="radarData"></chart>
                    </div>
                </div>
            </div>
            <div class="column is-half">
                <div class="box">
                    <h3>Polar Area Chart</h3>
                    <div>
                        <chart type="polarArea" :data="dynamicPolarAreaData"></chart>
                    </div>
                </div>
            </div>
        </div> -->
<!--         <h2>Components</h2>
        <div class="columns">
            <div class="column is-half">
                <div class="box">
                    <h3>Form</h3>
                    <label class="label">Name</label>
                    <p class="control">
                        <input class="input" placeholder="Text input" type="text">
                    </p>
                    <label class="label">Username</label>
                    <p class="control has-icon has-icon-right">
                        <input class="input is-success" placeholder="Text input" value="bulma" type="text">
                        <i class="fa fa-check"></i>
                        <span class="help is-success">This username is available</span>
                    </p>
                    <label class="label">Email</label>
                    <p class="control has-icon has-icon-right">
                        <input class="input is-danger" placeholder="Email input" value="hello@" type="text">
                        <i class="fa fa-warning"></i>
                        <span class="help is-danger">This email is invalid</span>
                    </p>
                    <label class="label">Subject</label>
                    <p class="control">
          <span class="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </span>
                    </p>
                    <label class="label">Message</label>
                    <p class="control">
                        <textarea class="textarea" placeholder="Textarea"></textarea>
                    </p>
                    <p class="control">
                        <label class="checkbox">
                            <input type="checkbox">
                            Remember me
                        </label>
                    </p>
                    <p class="control">
                        <label class="radio">
                            <input name="question" type="radio">
                            Yes
                        </label>
                        <label class="radio">
                            <input name="question" type="radio">
                            No
                        </label>
                    </p>
                    <p class="control">
                        <button class="button is-primary">Submit</button>
                        <button class="button is-link">Cancel</button>
                    </p>
                </div>
            </div>
            <div class="column is-half">
            </div>
        </div> -->
    </section>
</template>
<style>
    /* always present */
    .expand-transition {
        overflow: hidden;
    }

    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-enter, .expand-leave {
        height: 0;
        padding: 0 10px;
        opacity: 0;
    }

</style>
<script>
    import Chart from '../ui/Chart.vue'

    export default{
        data () {
            return {
                applicationsCount: 0,
                domainsCount: 0,
                application_running: 0,
                application_stop: 0,
                version: '个人版',
                doughnutData: [200, 300, 400],
                barData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: '销售',
                        backgroundColor: '#FF6384',
                        borderColor: '#CCCCCC',
                        borderWidth: 1,
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }, {
                        label: '利润',
                        backgroundColor: '#36A2EB',
                        borderColor: '#CCCCCC',
                        borderWidth: 1,
                        data: [32, 22, 45, 56, 22, 33, 22]
                    }, {
                        label: '费用',
                        backgroundColor: '#FFCE56',
                        borderColor: '#CCCCCC',
                        borderWidth: 1,
                        data: [32, 18, 3, 22, 44, 19, 7]
                    }]
                },
                polarAreaData: [
                    11,
                    16,
                    7,
                    3,
                    14
                ],
                radarData: {
                    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
                    datasets: [
                        {
                            label: 'Richard',
                            backgroundColor: 'rgba(179,181,198,0.2)',
                            borderColor: 'rgba(179,181,198,1)',
                            pointBackgroundColor: 'rgba(179,181,198,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(179,181,198,1)',
                            data: [65, 59, 90, 81, 56, 55, 40]
                        },
                        {
                            label: 'Bill',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            pointBackgroundColor: 'rgba(255,99,132,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(255,99,132,1)',
                            data: [28, 48, 40, 19, 96, 27, 100]
                        }
                    ]
                }
            }
        },
        ready: function() {

            if(localStorage.getItem('ideName') != undefined){
                  this.version = localStorage.getItem('ideName');
            }

            var _self = this;
            console.log(currentUser);
            services.Common.count({
                url: 'applications',
                param: {
                    creator: currentUser
                },
                cb: function(res){
                      if(res.status == 200){
                          var data = res.data;
                          if(data.code == 1){

                              _self.applicationsCount = data.fields;
                          }
                      }
                }
            });
            services.Common.count({
                url: 'applications',
                param: {
                    creator: currentUser,
                    status:0,
                },
                cb: function(res){
                      if(res.status == 200){
                          var data = res.data;
                          if(data.code == 1){

                              _self.application_stop = data.fields;
                          }
                      }
                }
            });
            services.Common.count({
                url: 'applications',
                param: {
                    creator: currentUser,
                    status:1,
                },
                cb: function(res){
                      if(res.status == 200){
                          var data = res.data;
                          if(data.code == 1){

                              _self.application_running = data.fields;
                          }
                      }
                }
            });
            services.Common.count({
                url: 'domains',
                param: {
                    creator: currentUser
                },
                cb: function(res){
                      if(res.status == 200){
                          var data = res.data;
                          if(data.code == 1){

                              _self.domainsCount = data.fields;
                          }
                      }
                }
            });
        },
        computed: {
            dynamicDoughnutData () {
                return {
                    labels: [
                        'Red',
                        'Blue',
                        'Yellow'
                    ],
                    datasets: [{
                        data: this.doughnutData,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56'
                        ]
                    }]
                }
            },
            dynamicPolarAreaData () {
                return {
                    datasets: [{
                        data: this.polarAreaData,
                        backgroundColor: [
                            '#FF6384',
                            '#4BC0C0',
                            '#FFCE56',
                            '#E7E9ED',
                            '#36A2EB'
                        ],
                        label: 'My dataset' // for legend
                    }],
                    labels: [
                        'Red',
                        'Green',
                        'Yellow',
                        'Grey',
                        'Blue'
                    ]
                }
            }
        },
        created () {
            var self = this
            self.timer = setInterval(function () {
                self.doughnutData.forEach(function (item, i) {
                    self.doughnutData.$set(i, Math.ceil(Math.random() * 1000))
                })
                self.polarAreaData.forEach(function (item, i) {
                    self.polarAreaData.$set(i, Math.ceil(Math.random() * 20))
                })
            }, 1024)
        },
        beforeDestroy () {
            if (this.timer) {
                clearInterval(this.timer)
            }
        },
        components: {
            Chart
        }
    }
</script>
