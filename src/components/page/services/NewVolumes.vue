<template>
    <div class="container">
        <h1 class="title">创建数据卷</h1>
        <h2 class="subtitle">数据卷服务是<strong>dodora容器云</strong>持久化数据、共享数据的存储空间</h2>
        <hr>
        <div class="content">

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">数据卷名称</label>
              </div>
              <div class="control is-grouped">
                <p class="control is-expanded">
                    <input class="input" type="text" placeholder="数据卷名称" v-model="volume.name">
                </p>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">数据卷配置</label>
              </div>
              <div class="control is-grouped" style="margin-left:-10px">
                <div class="columns">

                    <div class="column" style="margin-left:0px" v-for="volume in volumes">
                        <div class="docker-config-box active" @click="selectThisDockerConfig(volume)">
                            <ul class="text-center parameter">
                                <li><i style="font-size:20px" class="fa fa-database" aria-hidden="true"></i></li>
                            </ul>
                            <div class="down-style">{{volume.name}}</div>
                        </div>
                    </div>

                </div>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">数据卷大小</label>
              </div>
              <div class="control is-grouped" style="margin-left:16px">
                <div class="columns">
                    <div class="column is-10">
                        <input v-model="volume.size" min="{{volume.min}}" max="{{volume.max}}" step="{{step}}" class="slider" type="range" style="margin-top:14px">
                    </div>
                    <div class="column is-10">
                        <span class="help is-tip" >{{volume.size}}G</span>
                    </div>
                </div>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">数据卷时长</label>
              </div>
              <div class="control is-grouped" style="margin-left:30px">
                <div class="columns">
                    <div class="column">
                        <cyc :price.sync="price"></cyc>
                    </div>
                </div>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">创建数据卷</label>
              </div>
              <div class="control is-grouped" style="margin-left:-16px">
                <button class="button is-primary" v-bind:class="{'is-loading': isCreateVolume}" @click="createVolume">立即创建</button>
              </div>
            </div>

            <hr>

        </div>
    </div>
</template>
<style>

    input.slider[type="range"] {
        --height: 6px!important;
    }

</style>
<script>

    import Slider from 'vue-bulma-slider'
    import Cyc from '../../ui/Cyc.vue'

    export default{
        data () {
            return {
                isRefresh: false,

                isCreateVolume: false,

                volume: {
                    size: 10,
                    min: 0,
                    max: 100,
                    step: 10,
                    config: '',
                    time: '',
                    unit: '',
                    name: ''
                },
                volumes:[],
                price: 0,
                unitPrice: 0,
                month: 1,
                freeSize: 5,
                size: 1,
            }
        },
        components: {
            Slider,
            Cyc
        },

        ready () {

            this.selectCycBykey(0);

        },

        methods: {
            refreshAppList: function() {
                this.isRefresh = true;
            },

            createVolume: function() {
                this.isCreateVolume = true;

                if(this.price != 0){
                  services.OrderService.order({
                    products: this.volume.config,
                    price: this.size * this.unitPrice,
                    size: this.size,
                    unitPrice: this.unitPrice
                  }).then(function(res){
                      ;
                      window.location.href = res.body;
                  },function(err,res){

                  });
                }
                console.log( this.volume);
                this.volume.creator = currentUser;
                var _self = this;
                var options = {

                    param: this.volume,
                    url: "volumes",
                    msg: {
                      success: "新建数据卷成功",
                      failed : "新建数据卷失败",
                    },
                    ctx: _self
                };
                services.Common.create(options);
            },
            selectCycBykey: function() {

            },
            selectThisDockerConfig: function(volume) {

                this.volume.min = volume.min;
                this.volume.max = volume.max;
                this.volume.config = volume.id;

                this.unitPrice = volume.price;
                console.log("max" + this.volume.max);
                this.freeSize = volume.freeSize;
            },
            initVolumesConfigs: function() {
                var _self = this;

                services.Common.list(
                  {
                    param: { type: 'volume'},
                    url:"products",
                    target: 'volumes',
                    ctx: _self
                  }
                );
            }
        },
        ready:function() {

            this.$get("initVolumesConfigs")();
        },
        events: {
            'cycSelected': function(cyc) {

                if(this.volume.size <= this.freeSize){
                    this.price = 0;
                }else {
                  this.size = cyc.cyc;
                  var total = cyc.cyc * this.unitPrice * this.volume.size;
                  this.price = this.unitPrice +" X "+ this.volume.size + " G " + " X " +cyc.cyc+" "+cyc.unit +" = "+total;
                  ;
                }


            }
        },
        watch: {

            "volume.size": function(val,oldVal) {

              if(this.volume.size <= this.freeSize){
                  this.price = 0;
              }else {
                  var total =   this.month * this.unitPrice * this.volume.size;
                  this.price = this.unitPrice +" X "+ this.volume.size + " G " + " X " +this.month+" 月 = "+total;
                  ;
              }

            }
        }
    }
</script>
