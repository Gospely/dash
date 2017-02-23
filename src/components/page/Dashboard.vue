<template>
    <section class="section content">

        <h2>部署的应用</h2>
        <div class="columns">
            <div class="column">
                <div class="notification is-success has-text-centered">
                    <p class="title">总应用</p>
                    <i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i>
                    <p v-show="dataLoaded" class="subtitle">{{applicationsCount}}</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-info has-text-centered">
                    <p class="title">域名</p>
                    <i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i>
                    <p v-show="dataLoaded" class="subtitle">{{domainsCount}}</p>
                </div>
            </div>
            <div class="column">
                <div class=" notification is-warning has-text-centered">
                    <p class="title">运行中</p>
                    <i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i>
                    <p v-show="dataLoaded" class="subtitle">{{application_running}}</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-danger has-text-centered">
                    <p class="title">已停止</p>
                    <i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i>
                    <p v-show="dataLoaded" class="subtitle">{{application_stop}}</p>
                </div>
            </div>
        </div>

        <h2>应用类型</h2>
        <div class="columns">
            <div class="column">
                <div class="notification is-success has-text-centered">
                    <p class="title">普通应用</p>
                    <i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i>
                    <p v-show="dataLoaded" class="subtitle">{{commonAppCount}}</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-success has-text-centered">
                    <p class="title">快速部署应用</p>
                    <i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i>
                    <p v-show="dataLoaded" class="subtitle">{{deployFastCount}}</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-success has-text-centered">
                    <p class="title">小程序应用</p>
                    <i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i>
                    <p v-show="dataLoaded" class="subtitle">{{wechatCount}}</p>
                </div>
            </div>
            <div class="column">
                <div class="notification is-success has-text-centered">
                    <p class="title">VD应用</p>
                    <i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i>
                    <p v-show="dataLoaded" class="subtitle">{{vdCount}}</p>
                </div>
            </div>
        </div>

        <h2>集成开发环境</h2>
        <div class="columns">
            <div class="column is-one-third">
                <p class="notification has-text-centered">
                    <span class="title">版本<br><span v-show="dataLoaded" class="subtitle">{{version}}</span><i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i></span>
                </p>
            </div>

            <div class="column">
                <div class="notification has-text-centered">
                    <p class="title">
                        <button class="button is-primary" @click="toNewApp">打开IDE</button>
                    </p>
                    <p class="subtitle" style="font-size:15px">享受一站式开发</p>
                </div>
            </div>

            <div class="column">
                <p class="notification has-text-centered">
                    <span class="title">到期时间<br><span v-show="dataLoaded" class="subtitle">{{expireat}}</span><i v-show="!dataLoaded" class="fa fa-spinner fa-spin fa-fw"></i></span>
                </p>
            </div>
        </div>
        <h2>数据卷</h2>
        <div class="columns">
            <div class="column">
                <div class="box">
                    <h3>免费</h3>
                    <div>
                        <chart type="doughnut" :data="dynamicDoughnutData"></chart>
                    </div>
                </div>
            </div>

            <div class="column is-half">
                <div class="box">
                    <h3>收费</h3>
                    <div>
                        <chart type="doughnut" :data="dynamicDoughnutData"></chart>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
    .expand-transition {
        overflow: hidden;
    }

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
                commonAppCount: 0,
                deployFastCount: 0,
                wechatCount: 0,
                vdCount: 0,
                version: '个人版',
                expireat: '',
                doughnutData: [200, 300],
                dataLoaded: false,
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

            var _self = this;
            if(localStorage.getItem('ideName') != undefined){
                this.version = localStorage.getItem('ideName');
                var ide = localStorage.getItem('ide');
                services.Common.getOne({
                    param: {
                        id: ide
                    },

                    url: "ides",

                    cb: function(res) {
                        if(res.status == 200){
                            var data = res.data;
                            if(data.code == 1){

                                function dateFormat(date,fmt){ //author: meizz
                                    var o = {
                                        "M+" : date.getMonth()+1,                 //月份
                                        "d+" : date.getDate(),                    //日
                                        "h+" : date.getHours(),                   //小时
                                        "m+" : date.getMinutes(),                 //分
                                        "s+" : date.getSeconds(),                 //秒
                                        "q+" : Math.floor((date.getMonth()+3)/3), //季度
                                        "S"  : date.getMilliseconds()             //毫秒
                                    };
                                    if(/(y+)/.test(fmt))
                                        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                                    for(var k in o)
                                        if(new RegExp("("+ k +")").test(fmt))
                                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                                    return fmt;
                                }
                                if(data.fields.expireAt == null || data.fields.expireAt == undefined || data.fields.expireAt == '') {
                                    _self.expireat = '免费无限版本';
                                }else{
                                    _self.expireat = dateFormat(new Date(data.fields.expireAt),"yyyy-MM-dd");
                                }

                                _self.dataLoaded = true;

                            }
                        }

                    }
                });
            }

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
                    status: -1,
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
                    status: 1,
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
                url: 'applications',
                param: {
                    creator: currentUser,
                    type: 'deployfast',
                },
                cb: function(res){
                      if(res.status == 200){
                          var data = res.data;
                          if(data.code == 1){
                              _self.deployFastCount = data.fields;
                          }
                      }
                }
            });
            services.Common.count({
                url: 'applications',
                param: {
                    creator: currentUser,
                    image: 'wechat:latest',
                },
                cb: function(res){
                      if(res.status == 200){
                          var data = res.data;
                          if(data.code == 1){
                              _self.wechatCount = data.fields;
                          }
                      }
                }
            });
            services.Common.count({
                url: 'applications',
                param: {
                    creator: currentUser,
                    type: 'vd',
                },
                cb: function(res){
                      if(res.status == 200){
                          var data = res.data;
                          if(data.code == 1){
                              _self.vdCount = data.fields;
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
            setTimeout(function() {
                _self.commonAppCount = _self.applicationsCount - _self.deployFastCount -
                    _self.vdCount - _self.wechatCount;
            }, 1000);
        },

        methods: {

            toNewApp: function() {
                if (window.parent !== window) {
                    parent.postMessage({
                        visitIde: {}
                    }, '*');
                    return false;
                }
                if(document.domain == 'localhost') {
                    window.location.href = "http://localhost:8989";
                }else {
                    window.location.href = "http://ide.gospely.com";
                }
            }

        },

        computed: {
            dynamicDoughnutData () {
                return {
                    labels: [
                        '已用',
                        '未用'
                    ],
                    datasets: [{
                        data: this.doughnutData,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB'
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
            var _self =  this;
            var used = 100;
            var rest = 100;
            services.VolumeService.info({
                user: currentUser
            }).then(function(res){
                var data = res.data.fields;
                used = parseInt(data.used)/1024;
                rest = parseInt(data.size) - used;
            },function(err){

            });
            setTimeout(function () {
                _self.doughnutData.$set(0,used.toFixed(2));
                _self.doughnutData.$set(1,rest.toFixed(2));
            }, 2000);
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
