<template>
    <div class="container">
        <h1 class="title">数据卷服务</h1>
        <h2 class="subtitle">数据卷服务是<strong>dodora容器云</strong>持久化数据、共享数据的存储空间</h2>
        <hr>
        <div class="content">
    
            <a v-link="{name:'newvolumes'}" class="button is-primary">
              创建数据卷
            </a>

            <a class="button is-primary" v-bind:class="{'is-loading': isRefresh}" @click="refreshAppList">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </a>

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="我的数据卷">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>名称</th>
                          <th>配置</th>
                          <th>容量</th>
                          <th>用量</th>
                          <th>操作</th>
                          <th></th>                    
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Gospel_Volume</td>
                          <td>分布式存储</td>
                          <td>
                            20GB
                          </td>
                          <td>
                            19.2kb
                          </td>
                          <td class="is-icon" title="进入数据卷">
                            <a v-link="{path: 'volumes/33222'}">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </tab-item>
            </tab>

        </div>
    </div>
</template>
<style>
</style>
<script>

    import {Tab, TabItem} from '../../ui/Tab'

    export default{
        data () {
            return {
                isRefresh: false
            }
        },
        components: {
            Tab,
            TabItem
        },

        methods: {
            refreshAppList: function() {
                this.isRefresh = true;
            }
        }
    }
</script>
