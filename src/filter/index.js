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

	},

	get: function(filter) {
		return this.vue.filter(filter);
	}

};