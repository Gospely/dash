<template>

	<p class="control has-icon has-icon-right">
	    <p class="control has-addons">
	      	<a class="button is-success" @click="useWechat" v-bind:class="{'is-active': isWechat}">
	        	<span class="icon is-small">
	          	<i class="fa fa-wechat"></i>
	        	</span>
	        	<span>微信</span>
	      	</a>
	      	<a class="button is-success" @click="useAlipay" v-bind:class="{'is-active': isAlipay}">
	        	<span class="icon is-small">
	          		<i class="fa fa-paypal"></i>
	        	</span>
	        	<span>支付宝</span>
	      	</a>
	    </p>
	 	<span v-show="showTips" class="help is-success">{{tips}}</span>

        <div v-show="isWechat">
            <div v-bind:style="{backgroundImage: 'url(' + qrcode + ')'}" style="background-position:center center;background-size:100%;width:130px;height:130px"></div>
            <span class="help is-success">请使用微信扫码支付</span>
        </div>

	</p>

</template>

<script>

	export default {

		data () {

			return {
                isWechat: true,
                isAlipay: false
			}

		},

		props: {

			showTips: {
				type: Boolean,
				default () {
					return true
				}
			},

			tips: {
				type: String,
				default () {
					return '支持支付宝和微信支付';
				}
			},

			qrcode: {
				type: String,
				default () {
					return 'http://qr.api.cli.im/qr?data=http%253A%252F%252Fivydom.com&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=fa75fe444c541a16f37237eebf2a3426';
				}
			}

		},

		methods: {

            useAlipay: function() {
                this.isWechat = false;
                this.isAlipay = true;
                this.$dispatch('alipay');
            },

            useWechat: function() {
                this.isWechat = true;
                this.isAlipay = false;
                this.$dispatch('weixin');
            }

		}

	}

</script>

<style>

</style>
