<template>

	<p class="control has-icon has-icon-right">
	 	<span v-show="showTips" class="help is-success">{{tips}}</span>

        <div v-show="isWechat">
            <div v-bind:style="{backgroundImage: 'url(' + qrcode + ')'}" style="background-position:center center;background-size:100%;width:130px;height:130px"></div>
            <span class="help is-success">微信扫码登陆</span>
        </div>

	</p>

</template>

<script>

	export default {

		data () {

			return {
                isWechat: true,
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
					return 'http://qr.api.cli.im/qr?data=&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=fa75fe444c541a16f37237eebf2a3426';
				}
			}

		},

		methods: {


		}

	}

</script>

<style>

</style>
