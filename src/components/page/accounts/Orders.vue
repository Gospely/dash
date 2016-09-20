<template>
    <div class="container">
        <h1 class="title">交易记录</h1>
        <hr>
        <div class="content">            
            
            <tab :active-index = "0" style= "width: 100%;">
                <tab-item title="已支付">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>订单编号</th>
                          <th>交易时间</th>
                          <th>订单金额</th>
                          <th>状态</th>
                          <th>所购产品</th>
                          <th>到期时间</th>                    
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>8433ada61838</td>
                          <td>2016-08-27</td>
                          <td>
                            ¥ 7.00 元
                          </td>
                          <td>
                            已支付
                          </td>
                          <td>
                              企业版Gospel集成开发环境
                          </td>
                          <td>
                              2017-08-27
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </tab-item>
                <tab-item title="未支付">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>订单编号</th>
                          <th>交易时间</th>
                          <th>订单金额</th>
                          <th>状态</th>
                          <th>所购产品</th>
                          <th>到期时间</th> 
                          <th>操作</th>                   
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>8433ada61838</td>
                          <td>2016-08-27</td>
                          <td>
                            ¥ 109.00 元
                          </td>
                          <td>
                            未支付
                          </td>
                          <td>
                              专业版Dodora容器云
                          </td>
                          <td>
                              2017-08-27
                          </td>
                          <td class="is-icon" title="继续支付">
                            <a href="#">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                          <td class="is-icon" title="取消订单">
                            <a @click="cancelOrder">
                              <i class="fa fa-times "></i>
                            </a>
                          </td>                          
                        </tr>
                        <tr>
                          <td>8433ada61838</td>
                          <td>2016-08-27</td>
                          <td>
                            ¥ 77.00 元
                          </td>
                          <td>
                            未支付
                          </td>
                          <td>
                              企业版Dodora容器云
                          </td>
                          <td>
                              2017-08-27
                          </td>
                          <td class="is-icon" title="进入应用">
                            <a href="#">
                              <i class="fa fa-share"></i>
                            </a>
                          </td>
                          <td class="is-icon" title="停止应用">
                            <a @click="cancelOrder">
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

    import Vue from 'vue'
    import {Tab, TabItem} from '../../ui/Tab'
    import Modal from '../../ui/Modal/Modal.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                msg: 'hello vue'
            }
        },
        components: {
            Tab,
            TabItem,
            Modal        
        },

        methods: {
            cancelOrder: function() {

                new ModalCtrl({
                    el: document.createElement('div'),
                    props: {
                        isShow: false,
                        header: {
                            default: '取消订单'
                        },
                        body: {
                            default: '您确定要取消此订单吗？'
                        }
                    },
                    events: {
                        'confirmed': function() {
                            console.log('sssss');
                            this.$destroy(true);
                        }
                    }
                }).show();

            }
        }
    }
</script>
