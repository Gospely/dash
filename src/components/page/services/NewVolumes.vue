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
                    <input class="input" type="text" placeholder="给您的应用取个名字吧">
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
                    
                    <div class="column" style="margin-left:0px">
                        <div class="docker-config-box active" @click="selectThisDockerConfig(val, key)">
                            <ul class="text-center parameter">
                                <li><i style="font-size:20px" class="fa fa-database" aria-hidden="true"></i></li>
                            </ul>
                            <div class="down-style">分布式存储</div>
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
                        <input v-model="volume.size" min="10" max="20" step="10" class="slider" type="range" style="margin-top:14px">                    
                    </div>
                    <div class="column is-10">
                        <span class="help is-tip" style="margin: 6px;">{{volume.size}} G</span>               
                    </div>                            
                </div>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">数据卷时长</label>
              </div>
              <div class="control is-grouped" style="margin-left:16px">
                <div class="columns">
                    <div class="column is-10">
                        <input v-model="volume.size" min="10" max="20" step="10" class="slider" type="range" style="margin-top:14px">                    
                    </div>
                    <div class="column is-10">
                        <span class="help is-tip" style="margin: 6px;">{{volume.size}} G</span>               
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

    export default{
        data () {
            return {
                isRefresh: false,

                isCreateVolume: false,

                volume: {
                    size: 10
                }
            }
        },
        components: {
            Slider
        },

        methods: {
            refreshAppList: function() {
                this.isRefresh = true;
            },

            createVolume: function() {
                this.isCreateVolume = true;
            }
        }
    }
</script>
