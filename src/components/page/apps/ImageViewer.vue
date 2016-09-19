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
	                <tr>
	                  <td>Gospel_docker</td>
	                  <td>8433ada61838</td>
	                  <td>
	                    latest
	                  </td>
	                  <td>
	                    4小时前
	                  </td>
	                  <td class="is-icon" title="选择">
	                    <a @click="selectThisImage('8433ada61838')">
	                      <i class="fa fa-check"></i>
	                    </a>
	                  </td>
	                </tr>
	              </tbody>
	            </table>
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
	                <tr>
	                  <td>Gospel_docker</td>
	                  <td>8433ada61838</td>
	                  <td>
	                    latest
	                  </td>
	                  <td>
	                    4小时前
	                  </td>
	                  <td class="is-icon" title="">
	                    <a @click="selectThisImage('8433ada61838')">
	                      <i class="fa fa-check"></i>
	                    </a>
	                  </td>
	                </tr>
	                <tr>
	                  <td>Gospel_docker_test</td>
	                  <td>8433ada61838</td>
	                  <td>
	                    Latest
	                  </td>
	                  <td>
	                    4小时前
	                  </td>
	                  <td class="is-icon" title="">
	                    <a @click="selectThisImage('8433ada61838')">
	                      <i class="fa fa-check"></i>
	                    </a>
	                  </td>
	                </tr>
	              </tbody>
	            </table>
	        </tab-item>
	    </tab>

    </div>

</template>

<style>


</style>

<script>
	
	import {Tab, TabItem} from '../../ui/Tab'

    export default{
        data () {
            return {

            }
        },

        components: {
            Tab,
            TabItem
        },

        methods: {

        	selectThisImage: function(id) {
				this.$dispatch('imageOnSelected', id);        		
        	}

        }
    }

</script>
