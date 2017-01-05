module.exports = {

	vue: undefined,

	init: function(v) {
		this.vue = v;

		this.vue.filter('dockerNamefilter', function(value) {
			if(value) {
				return value.replace('/', '');
			}
		});

		this.vue.filter('hostConfig', function(value) {
			if(value) {
				if(typeof value == 'object' && value.length > 0) {
					return value[0].HostPort;
				}
			}
		});

		this.vue.filter('memory', function(value) {
			if(value) {

				var val = (parseInt(value) / parseInt(1048576));

				if(val > 1024) {
					val = val / 1024 + 'GB';
				}else {
					val += 'MB';
				}

				return val;
			}
		});

		this.vue.filter('dockerStatus', function(value) {
			if(value) {
				return value == 1 ? '运行中' : '已停止';
			}
		});

		this.vue.filter('appDBInfo', function(value) {
			return value == '' ? '无数据库信息' : value;
		});

		this.vue.filter('dateFormat', function(date,fmt) {
			if(date) {
				date = new Date(date);
				var o = {
					"M+" : date.getMonth()+1,                 //月份
					"d+" : date.getDate(),                    //日
					"h+" : date.getHours(),                   //小时
					"m+" : date.getMinutes(),                 //分
					"s+" : date.getSeconds(),                 //秒
					"q+" : Math.floor((date.getMonth()+3)/3), //季度
					"S"  : date.getMilliseconds()             //毫秒
				};
				if(/(y+)/.test(fmt))
					fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
				for(var k in o)
					if(new RegExp("("+ k +")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				return fmt;
			}
		});

	},

	get: function(filter) {
		return this.vue.filter(filter);
	}

};
