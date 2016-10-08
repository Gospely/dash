<template>

    <div class="container">

	    <tab :active-index = "0" style= "width: 100%;">
	        <tab-item title="Dodora官方">
	            <table class="table">
	              <thead>
	                <tr>
	                  <th>镜像名称</th>
	                  <th>镜像描述</th>
	                  <th>标签</th>
	                  <th>更新时间</th>
	                  <th>操作</th>
	                </tr>
	              </thead>
	              <tbody>
                  <tr v-for="item in fields2">
	                  <td>{{item.name}}</td>
	                  <td>{{item.description}}</td>
	                  <td>
	                    {{item.label}}
	                  </td>
	                  <td>
	                    {{item.updateat}}
	                  </td>
	                  <td class="is-icon" title="">
	                    <a @click="selectThisImage(item.id)">
	                      <i class="fa fa-check"></i>
	                    </a>
	                  </td>
	                </tr>
	              </tbody>
	            </table>
              <page :cur.sync="cur_gospel" :all.sync="all_gospel" v-on:btn-click="listen_gospel"></page>
	        </tab-item>
	        <tab-item title="DockerHub">
	            <table class="table">
	              <thead>
	                <tr>
	                  <th>镜像名称</th>
	                  <th>镜像描述</th>
	                  <th>标签</th>
	                  <th>更新时间</th>
	                  <th>操作</th>
	                </tr>
	              </thead>
	              <tbody>
	                <tr v-for="item in fields">
	                  <td>{{item.name}}</td>
	                  <td>{{item.description}}</td>
	                  <td>
	                    {{item.label}}
	                  </td>
	                  <td>
	                    {{item.updateat}}
	                  </td>
	                  <td class="is-icon" title="">
	                    <a @click="selectThisImage(item.id)">
	                      <i class="fa fa-check"></i>
	                    </a>
	                  </td>
	                </tr>
	              </tbody>
	            </table>
              <page :cur.sync="cur" :all.sync="all" v-on:btn-click="listen"></page>
	        </tab-item>
	    </tab>

    </div>

</template>

<style>


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
                all: 8,
                cur_gospel: 1,
                all_gospel: 8,
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
            this.$get('init_docker_hub')(data);
          },
          listen_gospel: function(data) {
            console.log('你点击了'+data+ '页');
            this.$get('init_gospel_hub')(data);
          },
        	selectThisImage: function(id) {
				        this.$dispatch('imageOnSelected', id);
        	},
          init_docker_hub: function(cur){

              var _self = this;
              var options = {

                param: {
                  type: 'docker_hub',
                  limit: 1,
                  cur: cur,
                },
                url: 'images',
                ctx: _self
              }
              services.Common.list(options);
          },
          init_gospel_hub: function(cur){

              var _self = this;
              var options = {

                param: {
                  limit: 1,
                  cur: cur,
                  type: 'gospel_hub'
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
            this.$get("init_docker_hub")(1);
            this.$get("init_gospel_hub")(1);
        }
    }

</script>
