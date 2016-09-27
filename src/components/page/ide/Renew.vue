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
                          <th>版本</th>
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
                          <td>个人版</td>
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
                      <a class="button is-small">1个月</a>
                      <a class="button is-small">2个月</a>
                      <a class="button is-small">4个月</a>
                      <a class="button is-small">6个月</a>
                      <a class="button is-small">1年</a>
                      <a v-show="isOther == false" class="button is-small" @click="enterEditOtherTime">{{otherTime || 其它}}</a>
                      <input v-model="otherTime" v-show="isOther == true" class="input" type="text" @keydown.enter="isOther = false" style="position: absolute;width: 40px;height: 24px;box-shadow: none;margin-left:3px" />
                    </p>
                    <label class="label">选择主版本</label>
                    <p class="control">
                      <span class="select">
                        <select>
                          <option>个人版</option>
                          <option>企业版</option>
                          <option>教育版</option>    
                        </select>
                      </span>
                    </p>

                    <label class="label">选择次版本</label>
                    <p class="control">
                      <span class="select">
                        <select>
                          <option>旗舰版</option>
                          <option>Web App版</option>
                          <option>Hybrid App版</option>    
                          <option>微信小程序版</option>    
                        </select>
                      </span>
                    </p>

                    <div class="media-content">
                      <div class="content">
                        <div class="media-right" style="text-align:right">
                            <span class="is-tip">合计：</span>
                            <span class="is-big">1200.00 元</span>
                        </div>
                      </div>
                    </div>

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
                showRenewForm: false,

                isOther: false,
                otherTime: '其它'
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

            },

            enterEditOtherTime: function() {
              if(this.otherTime == '其它') {
                this.otherTime = '';
              }
              this.isOther = true;
            }
        }
    }
</script>
