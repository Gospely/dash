module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			create: function(volume) {
				console.log(volume);
				return _this.$http.post(baseUrl + 'volumes',{creator: volume});
			}

		}

	}

};
