<template>

    <div class="container">

	    <tab :active-index = "0" style= "width: 100%;" v-show="imageLoaded">
	        <!-- <tab-item title="官方镜像">
            <div class="columns">
              <div class="column" v-for="item in fields2">
                <div @click="selectThisImage(item)" class="creation-modal-choice" :style="{backgroundImage: 'url(' + item.description + ')'}">
                  {{item.name}}
                </div>
              </div>
            </div>
            <page :cur.sync="cur_gospel" :all.sync="all_gospel" v-on:btn-click="listen_gospel"></page>
            </tab-item> -->
            <tab-item title="快速应用部署">
            <div class="columns">
              <div class="column" v-for="item in fields">
                <div @click="selectThisImage(item)" class="creation-modal-choice" :style="{backgroundImage: 'url(' + item.description + ')'}">
                  {{item.name}}
                </div>
              </div>
            </div>
            <page :cur.sync="cur" :all.sync="all" v-on:btn-click="listen"></page>
            </tab-item>
	    </tab>

      <loading v-show="!imageLoaded"></loading>

    </div>

</template>

<style>

  .creation-modal-choice {
    cursor: pointer;
    width: 100px;
    display: inline-block;
    height: 100px;
    padding: 75px 0 0 0;
    text-align: center;
    margin-right: calc((600px - 2rem - 500px) / 8);
    background-size: contain;
    border-radius: 2px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .creation-modal-choice:hover {
    background: #f5f5f5;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
  }


</style>

<script>

	import {Tab, TabItem} from '../../ui/Tab'
  import Page from '../../ui/Page/Page.vue'

    export default{
        data () {
            return {
                fields: [],
                fields2: [],
                cur: 1,
                all: 1,
                cur_gospel: 1,
                all_gospel: 1,

                imageLoaded: false
            }
        },

        components: {
            Tab,
            TabItem,
            Page
        },

        methods: {

          listen: function(data) {
            console.log('你点击了'+data+ '页');
            this.$get('init_app_hub')(data);
          },
          listen_gospel: function(data) {
            console.log('你点击了'+data+ '页');
            this.$get('init_gospel_hub')(data);
          },
        	selectThisImage: function(item) {
				    this.$dispatch('imageOnSelected', item);
        	},
          init_app_hub: function(cur){

              var _self = this;
              var options = {

                param: {
                  type: 'application',
                  limit: 10,
                  cur: cur,
                },
                url: 'images',
                ctx: _self,

                cb: function(res) {
                  var data = res.data
                  _self.fields = data.fields;
                  _self.imageLoaded = true;
                }
              }
              services.Common.list(options);
          },
          init_gospel_hub: function(cur){

              var _self = this;
              var options = {

                param: {
                  limit: 20,
                  parent: '0',
                  cur: cur
                },
                url: 'images',
                all: 'all_gospel',
                target: 'fields2',
                ctx: _self
              }
              services.Common.list(options);
          }

        },

        ready: function(){
            console.log("init hub");
            this.$get("init_app_hub")(1);
            //this.$get("init_gospel_hub")(1);
        }
    }

</script>
