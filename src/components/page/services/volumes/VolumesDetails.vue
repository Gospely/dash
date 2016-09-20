<template>
    <div class="container">
        <h1 class="title"><back></back> 数据卷详情</h1>
        <hr>
        <div class="content">
    
            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="基本">
                    
                  <volumes-basic></volumes-basic>

                </tab-item>

                <tab-item title="绑定的应用">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>应用名称</th>
                          <th>应用ID</th>
                          <th>运行环境</th>
                          <th>状态</th>
                          <th>操作</th>
                          <th></th>                    
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Gospel_docker</td>
                          <td>8433ada61838</td>
                          <td>
                            Linux CentOS 7.0
                          </td>
                          <td>
                            运行中
                          </td>
                          <td class="is-icon" title="进入应用">
                            <a v-link="{path: '/apps/detail/1234567'}">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </tab-item>

                <tab-item title="设置">
                  <volumes-settings></volumes-settings>
                </tab-item>
            </tab>

        </div>
    </div>
</template>
<style>
</style>
<script>

    import {Tab, TabItem} from '../../../ui/Tab'
    import Back from '../../../ui/Back.vue'
    import VolumesSettings from './VolumesSettings.vue'
    import VolumesBasic from './VolumesBasic.vue'

    export default{
        data () {
            return {
                isRefresh: false
            }
        },
        components: {
            Tab,
            TabItem,
            Back,
            VolumesSettings,
            VolumesBasic
        },

        methods: {
            refreshAppList: function() {
                this.isRefresh = true;
            }
        }
    }
</script>
