<template>

	<div>
		
		<div class="wrapper">
			
			<div class="wrap animated bounce" v-show="steps.step[0].visible">
				<h2 class="subtitle">您的新项目叫什么名字？</h2>
				<p class="control">
				  <input v-model="app.name" class="input custom-input" type="text" placeholder="">
				</p>
				<br><br>
			</div>

			<div class="wrap animated bounce" v-show="steps.step[1].visible">
				<h2 class="subtitle">您是否想从Git创建？</h2>
				<p class="control">
				  <input v-model="app.name" class="input custom-input" type="text" placeholder="">
				</p>
				<br><br>
			</div>

			<div class="wrap animated bounce" v-show="steps.step[2].visible">
				<h2 class="subtitle">您的Git地址是什么？</h2>
				<p class="control">
				  <input v-model="app.name" class="input custom-input" type="text" placeholder="">
				</p>
				<br><br>
			</div>

		</div>

		<div class="steps">
			<a v-show="preVisible" class="button is-primary is-outlined custom-btn animated tada">< 上一步</a>
			<a v-show="app.name != ''" @click="nextStep" class="button is-primary is-outlined custom-btn animated tada">下一步 ></a>
		</div>

	</div>


</template>

<style>
	
	.wrap {
		margin: 0 auto;
		max-width: 38rem;
		text-align: center;	
	}

	.wrapper {
	  	display: flex;
	  	justify-content: center;
	  	align-items: center;
	  	height: 360px;
	}

	.custom-input {
		border-left: 0px;
		border-right: 0px;
		border-top: 0px;
		box-shadow: none;
		border-radius: 0px;
	}

	.custom-btn {
		border: 0px;
	}

	.custom-btn:hover {
		background: none!important;
		color: #6fdce8!important;
	}

	.steps {
		text-align: center;
		display: block;
	}

	.subtitle {
		font-weight: 200!important;
	}

</style>

<script>

export default {

	data () {

		return {
			preVisible: false,
			nextVisible: false,

			app: {
				name: ''
			},

			steps: {
				currentStep: 0,

				totalSteps: 3,

				step: [{
					name: 'fill-name',
					visible: true
				}, {
					name: 'fill-name',
					visible: false
				}, {
					name: 'fill-name',
					visible: false
				}]
			}
		}

	},

	created () {

	},

	methods: {
		displayNext: function(data) {
			if(app.name != '') {
				this.nextVisible = true;
			}else {
				this.nextVisible = false;
			}
		},

		nextStep: function() {
			var preStep = this.steps.currentStep;
			this.steps.currentStep++;
			this.steps.step[this.steps.currentStep].visible = true;
			this.steps.step[preStep].visible = false;
			this.preVisible = true;
		},

		prevStep: function() {
			var preStep = this.steps.currentStep;
			this.steps.currentStep--;
			this.steps.step[this.steps.currentStep].visible = true;
			this.steps.step[preStep].visible = false;

			if(this.steps.currentStep === 0) {
				this.preVisible = false;
			}
		}
	},

	watch: {

	}

}

</script>
