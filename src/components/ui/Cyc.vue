<template>

<div>
	<a v-for="(key, val) in cyc" style="margin-right: 4px;" v-show='showCyc' @click="selectCycBykey(key)" class="button" v-bind:class="{'is-primary': currentCyc == key}">{{val.label}}</a>
    <input v-model="otherTime" v-show="isOther == true" class="input" @blur="customSet(cyc.length -1)" type="text" @keydown.enter="selectThisCustomCyc(cyc.length -1)" style="width: 40px;height: 32px;box-shadow: none;" /><span style="line-height: 2.3;margin-left: 4px;" v-show="isOther == true" class="is-tip">/月</span>
    <p style="text-align:right;margin-top:20px" v-show="showTips">
				<span class="is-tip">共计：{{price}} 元</span>
    </p>
</div>

</template>

<style>

</style>

<script>
	export default{
        data () {
            return {

                otherTime: '其它',
                isOther: false,

                currentCyc: 0

            }
        },

        props: {
        	cyc: {
        		type: Array,
        		default () {
        			return [{
	                    label: '1个月',
	                    cyc: '1',
						unit: '月'
	                }, {
	                    label: '3个月',
	                    cyc: '3',
						unit: '月'
	                }, {
	                    label: '6个月',
	                    cyc: '6',
						unit: '月'
									}, {
											label: '12个月',
	                    cyc: '12',
						unit: '月'
	                }, {
	                    label: '其它',
	                    cyc: 0,
						unit: '月',
	                    isOther: true
	                }];
        		}
        	},

        	showTips: {
        		type: Boolean,
        		default () {
        			return true;
        		}
        	},
					showCyc: {
        		type: Boolean,
        		default () {
        			return true;
        		}
        	},

        	price: {
        		type: String,
        		default () {
        			return '40'
        		}
        	},
            otherTime: {
                // type: String || Number,
                default() {
                    return 0;
                }
            }
        },

        methods: {
            enterEditOtherTime: function() {
              if(this.otherTime == '其它') {
                this.otherTime = '';
              }
              this.isOther = true;
            },

            selectCycBykey: function(key) {
                if(key == this.currentCyc && !this.cyc[key].isOther) {
                    return false;
                }

                this.currentCyc = key;

                if(this.cyc[key].isOther) {
                    this.enterEditOtherTime();
                }else {
	                this.$dispatch('cycSelected', {
	                	cyc: this.cyc[key].cyc,
						unit: this.cyc[key].unit
	                });
                }
            },

            selectThisCustomCyc: function(key) {
                this.selectCycBykey(key);
                this.isOther = false;
                this.cyc[key].label = this.otherTime + '个月';

                this.$dispatch('cycSelected', {
                	cyc: this.otherTime,
					unit: this.cyc[key].unit
                });

            },
			customSet: function(key) {
				this.$dispatch('cycSelected', {
					cyc: this.otherTime,
					unit: this.cyc[key].unit
				});
			}

        },
		events: {
		    'cyc-broadcast': function (month) {

					console.log(month);
					if(parseInt(month) > 12 ){
						this.otherTime = month;
						console.log(this.showCyc);
						this.isOther = true;
						console.log("broadcast");
						this.$dispatch('cycSelected', {
							cyc: this.otherTime,
							unit: '月'
						});
					}
    		},
  		},
		watch: {
			'otherTime': function(newVal, oldVal){
				console.log("change");
				this.$dispatch('cycSelected', {
                	cyc: newVal,
					unit: '月'
                });
			}
		}
    }

</script>
