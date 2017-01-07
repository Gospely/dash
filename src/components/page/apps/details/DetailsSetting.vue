<template>
    <div class="container">
        <div class="basic-wrapper">
            <loading v-show="isDeleting"></loading>

            <div v-show="!isDeleting" class="columns">

                <div class="column">

                    <label class="label">删除应用</label>
                    <hr class="split">
                    <p class="control">
                        <button class="button is-danger" @click="askIfRemove">确认删除</button>
                    </p>

                </div>
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
                msg: 'hello vue',
                application: '',

                isDeleting: false,

                result: {}
            }
        },

        components: {
            Chart
        },

        methods: {
            askIfRemove: function() {
                var _self = this;
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
                            notification.alert('正在删除...请稍候...')
                            var options = {
                                param: {
                                    id: _self.application
                                },
                                url: 'applications',
                                target: 'result',
                                reload: function() {
                                    _self.$router.go('/apps/list');
                                },
                                ctx: _self
                            }
                            services.Common.delete(options);
                            _self.isDeleting = true;
                            this.$destroy(true);
                        }
                    }
                }).show();
            }
        },
        ready (){
          this.$set("application", this.$route.query.containerId);
        },
    }
</script>
