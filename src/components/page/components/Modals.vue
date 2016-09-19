<template>
    <section class="content">
        <h1 class="title">Modals</h1>
        <div class="columns">
            <div class="column">
                <button class="button is-primary" @click="test()">Default</button>
            </div>
            <div class="column">
                <button class="button is-primary" @click = "showDefaultModal()">Show Modal</button>
            </div>
        </div>
    </section>
</template>
<style>
</style>
<script>
    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'
    let ModalCtrl = Vue.extend(Modal)
    export default{
        data () {
            return {
                msg: 'hello vue'
            }
        },
        methods: {
            showDefaultModal () {
                var self = this;
                var modal = new ModalCtrl({
                    el: document.createElement('div'),
                    props: {
                        isShow: false,
                        header: {
                            default: 'fuck header'
                        },
                        body: {
                            default: 'fuckbody'
                        }
                    },
                    events: {
                        'confirmed': function() {
                            console.log('sssss');
                            this.$destroy(true);
                        }
                    }
                });
                modal.show()
            },
            test () {
                /*
                let Ctrl = Vue.extend({
                    replace: true,
                    template: '<div style="position:absolute; left:0; top:0; z-index: 10001; width: 200px; height: 200px; background: #f00;">Test</div>'
                })
                let ctrl = new Ctrl().$mount()
                ctrl.$appendTo(document.body)*/
                alert('test')
            }
        },
        components: {
            Modal
        }
    }
</script>
