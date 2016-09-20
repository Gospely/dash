<template>
    <div class="container">
        <h1 class="title">我的组织</h1>
        <hr>
        <div class="content">            
            
            <div class="control is-horizontal user-center">
              <div class="control-label">
                <label class="label">创建组织</label>
              </div>
              <div class="control is-grouped">
                    <button style="margin-left:10px" class="button is-primary" @click="startCreateTeam">创建组织</button>
              </div>
            </div>

            <hr>

            <div class="control is-horizontal user-center">
                <div class="control-label">
                    <label class="label">组织列表</label>
                </div>
                <div class="control is-grouped">

                    <div class="team">
                    
                        <article class="media">
                            <figure class="media-left">
                                <p class="image is-64x64">
                                    <img src="https://dn-daoweb-prod.qbox.me/static/organization_200.png">
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>团队名称</strong>
                                        <br>
                                        <div style="margin-top:5px">创建于:2016-08-23</div>
                                    </p>
                                </div>
                            </div>
                            <div class="media-right">
                                <button class="delete"></button>
                            </div>
                        </article>

                        <hr class="split">

                        <article class="media">
                            <figure class="media-left">
                                <p class="image is-64x64">
                                    <img src="https://dn-daoweb-prod.qbox.me/static/organization_200.png">
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>团队名称</strong>
                                        <br>
                                        <div style="margin-top:5px">创建于:2016-08-23</div>
                                    </p>
                                </div>
                            </div>
                            <div class="media-right">
                                <button class="delete"></button>
                            </div>
                        </article>

                        <hr class="split">

                        <article class="media">
                            <figure class="media-left">
                                <p class="image is-64x64">
                                    <img src="https://dn-daoweb-prod.qbox.me/static/organization_200.png">
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                        <strong>团队名称</strong>
                                        <br>
                                        <div style="margin-top:5px">创建于:2016-08-23</div>
                                    </p>
                                </div>
                            </div>
                            <div class="media-right">
                                <button class="delete"></button>
                            </div>
                        </article>

                    </div>

                </div>

            </div>

            <hr>

            <modal :is-html="true" :is-show.sync="showTeamAddingForm">
                <div slot="header">创建组织</div>
                <div slot="body">
                    <label class="label">组织名称</label>
                    <p class="control">
                      <input class="input" type="text" placeholder="给您的团队取个名字吧">
                    </p>
                </div>
                <div slot="footer">
                    <button class="button is-success"
                        @click="confirmCreateTeam">
                    确定
                    </button>
                    <button class="button" @click="showTeamAddingForm = false">取消</button>
                </div>
            </modal>

        </div>
    </div>
</template>
<style>
</style>
<script>

    import Vue from 'vue'
    import Modal from '../../ui/Modal/Modal.vue'

    let ModalCtrl = Vue.extend(Modal);

    export default{
        data () {
            return {
                showTeamAddingForm: false
            }
        },
        components: {
            Modal
        },

        methods: {
            startCreateTeam: function() {
                this.showTeamAddingForm = true;
            },

            confirmCreateTeam: function() {
                this.showTeamAddingForm = false;
            }
        }
    }
</script>
