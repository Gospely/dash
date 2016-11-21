module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			info: function(options) {
				return _this.$http.get(baseUrl + 'users/volume/' + options.user);


			}

		}

	}

};
