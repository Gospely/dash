<template>
    <div class="container">
        <h1 class="title">应用列表</h1>
        <h2 class="subtitle">这里有您在<strong>dodora容器云</strong>上部署的所有应用</h2>
        <hr>
        <div class="content">
            <a class="button is-primary" v-bind:class="{'is-loading': isRefresh}" @click="refreshAppList">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </a>

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="全部应用">
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
                          <td class="is-icon" title="停止应用">
                            <a href="#" @click="stopThisAPP()">
                              <i class="fa fa-times"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </tab-item>
                <tab-item title="运行中">
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
                            <a href="#">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                          <td class="is-icon" title="停止应用">
                            <a href="#">
                              <i class="fa fa-times "></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Gospel_docker_test</td>
                          <td>8433ada61838</td>
                          <td>
                            Linux CentOS 7.0
                          </td>
                          <td>
                            运行中
                          </td>
                          <td class="is-icon" title="进入应用">
                            <a href="#">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                          <td class="is-icon" title="停止应用">
                            <a href="#">
                              <i class="fa fa-times "></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </tab-item>
                <tab-item title="已停止">
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
                            <a href="#">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                          <td class="is-icon" title="停止应用">
                            <a href="#">
                              <i class="fa fa-times "></i>
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
            stopThisAPP: function() {

            },

            refreshAppList: function() {
                this.isRefresh = true;
            }
        }
    }
</script>
