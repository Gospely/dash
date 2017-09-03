<template>

	<p class="control has-icon has-icon-right">
	    <p class="control has-addons">
	      	<!-- <a class="button is-success" @click="useWechat" v-bind:class="{'is-active': isWechat}">
	        	<span class="icon is-small">
	          	<i class="fa fa-wechat"></i>
	        	</span>
	        	<span>微信</span>
	      	</a> -->
	      	<a class="button is-success" @click="useAlipay" v-bind:class="{'is-active': isAlipay}">
	        	<span class="icon is-small">
	          		<i class="fa fa-paypal"></i>
	        	</span>
	        	<span>支付宝</span>
	      	</a>
	    </p>
	 	<span v-show="showTips" class="help is-success">{{tips}}</span>

        <div v-show="isWechat">
					<div>
							<canvas
								:style="{height: size + 'px', width: size + 'px'}"
								height={{size}}
								width={{size}}
								v-el:qr
							></canvas>
					</div>
            <!-- <span class="help is-success">请使用微信扫码支付</span> -->
        </div>

	</p>

</template>

<script>
import qr from 'qr.js'
	export default {

		data () {

			return {
                isWechat: false,
                isAlipay: true
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
					// return '支持支付宝和微信支付';
					 return '支持支付宝';
				}
			},
			val: {
	      type: String,
	      required: true
	    },
	    size: {
	      type: Number,
	      default: 200
	    },
	    // 'L', 'M', 'Q', 'H'
	    level: String,
	    bgColor: {
	      type: String,
	      default: '#FFFFFF'
	    },
	    fgColor: {
	      type: String,
	      default: '#000000'
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
            },
				    update () {
				      var size = this.size
				      var bgColor = this.bgColor
				      var fgColor = this.fgColor
				      var $qr = this.$els.qr
				      var qrcode = qr(this.val)
				      var ctx = $qr.getContext('2d')
				      var cells = qrcode.modules
				      var tileW = size / cells.length
				      var tileH = size / cells.length
				      var scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx)
				      $qr.height = $qr.width = size * scale
				      ctx.scale(scale, scale)
				      cells.forEach(function (row, rdx) {
				        row.forEach(function (cell, cdx) {
				          ctx.fillStyle = cell ? fgColor : bgColor
				          var w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
				          var h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
				          ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
				        })
				      })
				    }
		},
		watch: {
				 size: function(){
					 this.update()
				 },
				 val: function(){
					 console.log("val");
					 this.update()
				 },
				 level: function(){
					 this.update()
				 },
				 bgColor: function(){
					 this.update()
				 },
				 fgColor: function(){
					 this.update()
				 }
			 },
	 ready () {
		 this.update()
	 },
	}
	function getBackingStorePixelRatio (ctx) {
	  return (
	    ctx.webkitBackingStorePixelRatio ||
	    ctx.mozBackingStorePixelRatio ||
	    ctx.msBackingStorePixelRatio ||
	    ctx.oBackingStorePixelRatio ||
	    ctx.backingStorePixelRatio ||
	    1
	  )
	}
</script>

<style>

</style>
