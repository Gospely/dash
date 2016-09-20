<template>
    <div class="container">
        <h1 class="title">管理您的Gospel集成开发环境</h1>
        <h2 class="subtitle">在这里您可以管理您的<strong>Gospel集成开发环境</strong></h2>
        <hr>
        <div class="content">
    
            <a class="button is-primary" v-bind:class="{'is-loading': isRefresh}" @click="refreshIDEState">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </a>

            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="我的IDE">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>名称</th>
                          <th>创建时间</th>
                          <th>到期时间</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Gospel_Volume</td>
                          <td>2015-12-07</td>
                          <td>
                            2016-12-07
                          </td>
                          <td class="is-icon" title="续费">
                            <a @click="showRenewForm = true">
                              <i class="fa fa-paypal"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </tab-item>
                <tab-item title="状态监控">
                    <ide-state></ide-state>
                </tab-item>
            </tab>

            <modal :is-html="true" :is-show.sync="showRenewForm">
                <div slot="header">续费IDE</div>
                <div slot="body">
                    <label class="label">续费时长</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="域名名称">
                    </p>
                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="confirmRenew">
                    确定
                    </button>
                    <button class="button" @click="showRenewForm = false">取消</button>
                </div>
            </modal>
        </div>
    </div>
</template>
<style>
</style>
<script>

    import {Tab, TabItem} from '../../ui/Tab'
    import IdeState from './IDEState'
    import Modal from '../../ui/Modal/Modal.vue'

    export default{
        data () {
            return {
                isRefresh: false,
                showRenewForm: false
            }
        },
        components: {
            Tab,
            TabItem,
            IdeState,
            Modal
        },

        methods: {
            refreshIDEState: function() {
                this.isRefresh = true;
            },

            confirmRenew: function() {

            }
        }
    }
</script>
