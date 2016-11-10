<template>
    <modal :is-html="true" :width="800" :is-show.sync="showVersionModal">
        <div slot="header">选择版本</div>
        <div slot="body">
            <div class="creation-modal-choice" :style="{backgroundImage: 'url(' + selectDescription + ')'}">{{selectName}}
            </div>
            <div class="versions-body">
                <p style="display:inline-block;margin-bottom:6px;">选择版本:</p>
                <p class="control has-addons" style="display:inline-block;margin-top:8px;">
                  <a :class="['button',{'is-success': index == thisIndex}]" v-for="(index,item) in versions" @click="selectThisVersion(item,index)">
                    <span>{{item.label}}</span>
                  </a>
                </p>
            </div>

            <div class="framework-body">
                <div>选择一个框架:</div>
                <hr class="split">
                <div :class="['creation-modal-choice',{'is-active': true}]" @click="" :style="{backgroundImage: 'url(' + selectDescription + ')'}">
                    框架
                </div>
                <div class="creation-modal-choice" :style="{backgroundImage: 'url(' + selectDescription + ')'}">
                    框架
                </div>
            </div>
        </div>
        <div slot="footer">
             <button class="button is-primary" @click="comfirmVersion">
                确认选择
            </button>

             <button class="button" @click="showVersionModal = false">取消</button>
        </div>
    </modal>
</template>

    <style>
        .versions-body, .framework-body {
            border: 1px solid #d3d6db;
            border-radius: 3px;
            padding: 12px 15px;
            background-color: #f5f7fa;
        }
        .versions-body {
            margin-bottom: 20px;
        }
        .versions-body .has-addons .button:last-child {
            border-right: 2px solid #d3d6db;
            border-radius: 0 5px 5px 0;
        }
        .versions-body .has-addons .button:last-child:hover {
            border-right-color: #aeb1b5;
        }
        .framework-body .creation-modal-choice:hover {
            background-color: #7bbf51;
        }
        .framework-body .is-active {
            background-color: #97cd76;
        }
    </style>

    <script>

    // import ImageViewer from '../apps/ImageViewer.vue'
    import Modal from './Modal/Modal.vue'
    // let ModalCtrl = Vue.extend(Modal);

    export default{
        props: {
            versions: {
                type:Array,
                required:true,
                default(){
                    return [];
                }
            },
            showVersionModal: {
                type:Boolean,
                required:true,
                default(){
                    return false
                }
            },
            selectName: {
                type:String,
                required:true,
                default(){
                    return '';
                }
            },
            selectDescription: {
                type:String,
                required:true,
                default(){
                    return '';
                }
            }

        },
        data () {
            return {
                thisIndex:'0'
            }
        },
        components: {
            Modal
        },

        methods:{
            selectThisVersion(item,index) {
                this.thisIndex = index;
                console.log(item);
                this.$dispatch('selectThisVersion',item);
            },
            comfirmVersion() {
                this.$dispatch('comfirmVersion');
            }
        }
    }
</script>
