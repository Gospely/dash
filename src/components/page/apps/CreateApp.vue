<template>

	<div>

		<div class="wrapper">

			<div :class="['wrap', 'animated',
				{ fadeInLeft: steps.currentStep == 0 && steps.slidDirection == 'left' },
				{ fadeInRight: steps.currentStep == 0 && steps.slidDirection == 'right' }]"
				v-show="steps.currentStep == 0">
				<h2 class="subtitle">您的新项目叫什么名字?</h2>
				<p class="control">
				  <input v-model="app.name" class="input custom-input" type="text" placeholder="myApp">
				</p>
				<br><br>
			</div>

			<div :class="['wrap', 'animated',
				{ fadeInRight: steps.currentStep == 1 && steps.slidDirection == 'right' },
				{ fadeInLeft: steps.currentStep == 1 && steps.slidDirection == 'left' }]"
				v-show="steps.currentStep == 1">
				<h2 class="subtitle">您是否想从Git创建?</h2>
				<p class="control">
				  <input v-model="app.git" placeholder="https://github.com/xxx" class="input custom-input"
				  type="text">
				</p>
				<br><br>
			</div>

			<div :class="['wrap', 'animated',
				{ fadeInRight: steps.currentStep == 2 && steps.slidDirection == 'right' },
				{ fadeInLeft: steps.currentStep == 2 && steps.slidDirection == 'left' }]"
				v-show="steps.currentStep == 2">
				<h2 class="subtitle">您的项目使用主要哪种语言?</h2>
				<div class="columns">
				    <div class="column" v-for="item in languageTypes">
				        <div @click="selectThisLanguage(item)"
				        	:class="['creation-modal-choice', { isSelected: app.languageType == item.name}]"
				        	:style="{backgroundImage: 'url(' + item.description + ')'}">
				     		{{item.name}}
				    	</div>
				    </div>
				</div>
				<page :cur.sync="cur_gospel" :all.sync="all_gospel" v-on:btn-click="listen_gospel"></page>
			</div>

			<div :class="['wrap', 'animated',
				{ fadeInRight: steps.currentStep == 3 && steps.slidDirection == 'right' },
				{ fadeInLeft: steps.currentStep == 3 && steps.slidDirection == 'left' }]"
				v-show="steps.currentStep == 3">
				<h2 class="subtitle">您想要使用哪个框架?</h2>
				<div class="columns">
				  <div class="column" v-for="item in frameworks">
				    <div @click="selectThisFramework(item)"
				    	:class="['creation-modal-choice', { isSelected: app.framework == item.name}]"
				    	:style="{backgroundImage: 'url(' + item.description + ')'}">
				      	{{item.name}}
				    </div>
				  </div>
				</div>
				<page :cur.sync="cur_gospel" :all.sync="all_gospel" v-on:btn-click="listen_gospel"></page>
			</div>

			<div :class="['wrap', 'animated',
				{ fadeInRight: steps.currentStep == 4 && steps.slidDirection == 'right' },
				{ fadeInLeft: steps.currentStep == 4 && steps.slidDirection == 'left' }]"
				  v-show="steps.currentStep == 4">
				<h2 class="subtitle">此应用在哪个端口开放?</h2>
				<p class="control">
				    <input v-model="app.exposePort" placeholder="8080" class="input custom-input" type="text">
				</p>
				<br><br>
			</div>

			<div :class="['wrap', 'animated',
				{ fadeInRight: steps.currentStep == 5 && steps.slidDirection == 'right' },
				{ fadeInLeft: steps.currentStep == 5 && steps.slidDirection == 'left' }]"
				v-show="steps.currentStep == 5">
				<h2 class="subtitle">您是否想在开发环境创建数据库?</h2>
				<div class="columns">
				    <div class="column" v-for="item in databaseTypes">
				        <div @click="selectThisDatabase(item)"
				        	:class="['creation-modal-choice', { isSelected: app.databaseType == item.label}]"
				        	:style="{backgroundImage: 'url(' + item.description + ')'}">
				     		{{item.label}}
				    	</div>
				    </div>
				</div>
				<br><br>
			</div>

			<div :class="['wrap', 'animated',
				{ fadeInRight: steps.currentStep == 6 && steps.slidDirection == 'right' },
				{ fadeInLeft: steps.currentStep == 6 && steps.slidDirection == 'left' }]"
				  v-show="steps.currentStep == 6">
				<h2 class="subtitle">您的数据库密码?</h2>
				<p class="control">
				    <input v-model="app.detabasePassword" placeholder="* * * * *" class="input custom-input" type="password">
				</p>
				<br><br>
			</div>

			<div :class="['wrap', 'animated',
				{ fadeInRight: steps.currentStep == 7 && steps.slidDirection == 'right' },
				{ fadeInLeft: steps.currentStep == 7 && steps.slidDirection == 'left' }]"
				  v-show="steps.currentStep == 7">
				<h2 class="subtitle">信息都对吗?</h2>

				<br><br>
			</div>

		</div>

		<div class="steps">
			<a v-show="preVisible"
			   :class="['button', 'is-large', 'is-primary', 'is-outlined', 'custom-btn', 'animated', { fadeInLeft: true }]"
			   @click="prevStep"
			>
				&#60;
				上一步
			</a>
			<a v-show="nextVisible"
				:class="['button', 'is-large', 'is-primary', 'is-outlined', 'custom-btn', 'animated', { fadeInLeft: true }]"
				@click="nextStep"
				:disabled="false"
			>
				下一步
				&#62;
			</a>
			<a v-show="steps.currentStep == 1 || steps.currentStep == 5 || steps.currentStep == 3"
				:class="['button', 'is-large', 'is-primary', 'is-outlined', 'custom-btn', 'animated', { fadeInLeft: true }]"
				@click="skipStep"
			>
				跳过
				&#62;&#62;
			</a>
			<a v-show="steps.currentStep == 7"
				:class="['button', 'is-large', 'is-primary', 'is-outlined', 'custom-btn', 'animated', { fadeInLeft: true }]"
				@click="goCreate"
			>
				确认创建
			</a>
		</div>

		<modal :is-html="true" :width="400" :is-show.sync="showVersionModal">
			<div slot="header">选择版本</div>
			<div slot="body">
    			<p class="control">
    				<label v-for="item in languageVersions" class="radio" @click="app.languageVersion = item.label">
				    	<input type="radio" name="version">
				   		 {{item.label}}
					</label>
				</p>
			</div>
			<div slot="footer">
			     <button class="button is-primary" @click="showVersionModal = false; alert(3)">
			        确定
			    </button>
			</div>
		</modal>

		<loading :loading="isCreating" tip="创建中,请稍后..."></loading>
	</div>


</template>

<style>

	.wrap {
		margin: 0 auto;
		width: 65rem;
		height: 20rem;
		padding: 0 1.5rem;
		/*text-align: center;	*/
		/*background: #eaebec;*/
	}

	.wrapper {
	  	display: flex;
	  	justify-content: center;
	  	align-items: center;
	  	height: 360px;
	  	padding-top: 10rem;
	}

	.custom-input {
		border-left: 0px;
		border-right: 0px;
		border-top: 0px;
		box-shadow: none;
		border-radius: 0px;
		font-size: 2.5rem;
		padding: 2.5rem 0;
		color: #363636;
		letter-spacing: 1px;
		width: 50rem;
	}

	.custom-btn {
		border: none;
		font-weight: 100;
	}
	.custom-btn:first-child {
		margin-left: 0;
	}

	.custom-btn:hover {
		background: none!important;
		color: #6fdce8!important;
	}

	.steps {
		width: 65rem;
		display: block;
		margin: 0 auto;
	}

	.subtitle {
		font-weight: 200!important;
	}

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
  }

  .creation-modal-choice:hover {
    background: #f5f5f5;
    background-position: center;
    background-size: 100%;
  }

  .isSelected {
  	background: #f5f5f5;
  	background-position: center;
    background-size: 100%;
  }

</style>

<script>

import Page from '../../ui/Page/Page.vue'
import Modal from '../../ui/Modal/Modal.vue'
import Loading from '../../ui/Loading.vue'

export default {

	data () {

		return {
			preVisible: false,
			// nextVisible: true,
			isCreating: false,
			app: {
				name: '',
				git: '',
				languageType: '',
				languageVersion: '',
				databaseType: '',
				detabasePassword: '',
				framework: '',
				exposePort: '',
				creator: currentUser
			},
			databaseTypes:[
				{
				  label: 'mysql',
				  description: '../../../assets/projects/db/mysql.png',
				},
				{
				  label: 'postgres',
				  description: ''
				},
				{
				  label: 'mongodb',
				  description: ''
				}
			],
			steps: {
				currentStep: 0,

				totalSteps: 8,

				slidDirection: 'right',

				skipFrom: '',

				step: [{
					name: 'name'
				}, {
					name: 'git'
				}, {
					name: 'languageType'
				}, {
					name: 'framework'
			 	}, {
					name: 'exposePort'
				}, {
					name: 'databaseType'
				}, {
					name: 'detabasePassword'
				}, {
					name: 'comfirmInformation'
				}]
			},
			languageTypes: [],
			frameworks: [],
			languageVersions: [],
			showVersionModal: false

		}

	},

	components: {
        Page,
        Modal,
        Loading
    },

	created () {

	},

	methods: {

		nextStep: function() {
			var preStep = this.steps.currentStep;
			this.steps.currentStep++;
			this.preVisible = true;
			this.steps.slidDirection = 'right';

			//初始化框架面板
			if(this.app.languageType != null && this.app.languageType != '' && this.steps.currentStep == 3){
				this.$get("init_app_hub")(1);
			}
		},

		prevStep: function() {
			let currentStep = this.steps.currentStep
			if (this.steps.skipFrom == 1 && currentStep == 2) {
				currentStep = 1;
			}else if (this.steps.skipFrom == 5 && currentStep == 7) {
				currentStep = 5
			}else {
				currentStep--;
			}
			if(currentStep === 0) {
				this.preVisible = false;
			}
			this.steps.slidDirection = 'left';
			this.steps.currentStep = currentStep;
		},
		skipStep: function () {
			let currentStep = this.steps.currentStep;
			if (currentStep == 1) {
				currentStep = 2;
				this.steps.skipFrom = 1;
			}else if (currentStep == 3) {
				currentStep ++;
			}else {
				currentStep = 7;
				this.steps.skipFrom = 5
			}

			this.steps.currentStep = currentStep;
			this.steps.slidDirection = 'right';
		},

		selectThisLanguage(item) {
			this.app.languageType = item.name;
			this.$get("initVersion")();
		},

		selectThisDatabase(item) {
			this.app.databaseType = item.label;
		},

		selectThisFramework(item) {
			this.app.framework = item.name;
		},

		goCreate() {
			this.isCreating = true;
			if (!/^https?/.test(this.app.git)) {
				this.app.git = this.app.git.replace(/git@github.com:/,'https://github.com/')
			}else if (!/https:\/\/github.com\/?/.test(this.app.git) && !/git@github.com:?/.test(this.app.git)) {
				notification.alert('git地址错误 ', 'danger')
			}
			console.log(this.app);

			services.Common.create({
				url: 'applications',
				param: this.app,
				cb: function(res){

				}
			});
		},

		listen_gospel(data) {
            console.log('你点击了'+data+ '页');
            this.$get('init_gospel_hub')(data);
        },

		init_gospel_hub: function(cur) {

            var _self = this;
            var options = {
                param: {
                  limit: 20,
                  parent: '0',
                  cur: cur
                },
                url: 'images',
                all: 'all_gospel',
                target: 'languageTypes',
                ctx: _self
            }
            services.Common.list(options);
        },

        init_app_hub: function(cur){

            var _self = this;
            var options = {

             	param: {
                	limit: 10,
                	cur: cur,
					parent: this.app.languageType + ":latest",
					type: 'framework'
              	},
              	url: 'images',
              	ctx: _self,
              	target: 'frameworks'
            }
			console.log(options);
            services.Common.list(options);
        },
		initVersion: function(){
			var _self = this;
            var options = {

             	param: {
					name: this.app.languageType,
					type: 'lang'
              	},
              	url: 'images',
              	cb: function(res){

                        if(res.status == 200){
                            var data = res.data;
                            if(data.code == 1){
                                _self.languageVersions = data.fields;
                                if (data.fields.length !== 0) {
                                	_self.showVersionModal = true;
                                }
                            }
                        }

                }
            }
			console.log(options);
            services.Common.list(options);
		}
	},

	watch: function () {

	},

	computed: {
		nextVisible() {
			let _self = this;
			return this.app[this.steps.step[this.steps.currentStep].name] != '' && this.steps.currentStep != 7;
		}
	},

	ready: function () {
		this.$get("init_gospel_hub")(1);
	}

}

</script>
