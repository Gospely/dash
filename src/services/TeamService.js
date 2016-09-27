
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			userInfo: function(id) {
				console.log(id);
				return _this.$http.post(baseUrl + 'teams',{creator: id});
			}

		}

	}

};
