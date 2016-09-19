<template>

    <div class="modal-mask modal" v-show="isShow" transition="modal">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <h3><slot name="header">{{header}}</slot></h3>
                    <button class="delete" @click="destroy()" style="position: absolute;right: 20px;top: 19px;"></button>
                </div>

                <div class="modal-body">
                    <slot name="body">{{body}}</slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button class="button is-success"
                            @click="dispatchConfirmEvent">
                        确定
                        </button>
                        <button class="button" @click="destroy()">取消</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 500px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header, .modal-footer {
        border-bottom: 1px solid #d3d6db;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #f5f7fa;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        padding: 20px;
        position: relative;
    }

    .modal-footer {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top: 1px solid #d3d6db;
    }

    .modal-footer .button:not(:last-child) {
        margin-right: 10px;
    }

    .modal-header h3 {
        margin-top: 0;
        /*color: #42b983;*/
        font-size: 20px;
        margin-bottom: 0px;
    }

    .modal-body {
        background-color: #fff;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        -ms-flex-negative: 1;
        flex-shrink: 1;
        overflow: auto;
        padding: 20px;
    }

    .modal-default-button {
        float: right;
    }

    /*
     * the following styles are auto-applied to elements with
     * v-transition="modal" when their visiblity is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter, .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
<script>
    export default{
        data () {
            return {
                isAttached: false
            }
        },
        props: {
            isShow: {
                type: Boolean,
                required: false,
                default () {
                    return false
                },
                towWay: true
            },

            isHTML: {
                type: Boolean,
                required: false,
                default () {
                    return false
                },
                towWay: true
            },

            header: {
                type: String,
                required: false,
                default: 'default header',
                towWay: true
            },

            body: {
                type: String,
                required: false,
                default: 'default body test',
                towWay: true
            },

            footer: {
                type: String,
                required: false,
                default: 'default footer',
                towWay: true
            }

        },
        attached () {
            this.isAttached = true
        },
        detached () {
            this.isAttached = false
        },
        methods: {
            show () {
                if (!this.isAttached) {
                    this.$appendTo(document.body)
                }
                this.isShow = true
            },

            dispatchConfirmEvent () {
                this.$dispatch('confirmed');
            },

            destroy () {
                console.log(this.isHTML);
                if(this.isHTML) {
                    this.isShow = false;
                }else {
                    this.$destroy(true);
                }
            },

            watch: {
                isShow: function(val) {
                    console.log(val);
                }
            }
        }
    }
</script>
