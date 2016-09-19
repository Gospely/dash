<template>
    <div class="container">

        <div class="columns">
            <div class="column is-half">
                      
                <label class="label">删除应用</label>
                <p class="control">
                    <button class="button is-danger" @click="askIfRemove">确认删除</button>
                </p>

            </div>
        </div>

    </div>
</template>
<style>
</style>
<script>
    import Vue from 'vue'
    import Modal from '../../../ui/Modal/Modal.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                msg: 'hello vue'
            }
        },

        components: {
            Chart
        },

        methods: {
            askIfRemove: function() {
                new ModalCtrl({
                    el: document.createElement('div'),
                    props: {
                        isShow: false,
                        header: {
                            default: '删除应用'
                        },
                        body: {
                            default: '您确定要执行此操作吗？（此操作无法撤销）'
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
