
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			userInfo: function(id) {
				console.log(id);
				return _this.$http.get(baseUrl + 'users/'+id);
			},
			updatePwd: function(user) {

				console.log(user);
				return _this.$http.put(baseUrl + 'users',user);
			},
			uploadHead: function(user) {
				return _this.$http.post(baseUrl + 'users/photo',user);
			},
			register: function(user){

				return _this.$http.post(baseUrl + 'users/register',user);
			},
			login: function(user) {
				return _this.$http.post(baseUrl + 'users/login',user);
			}

		}

	}

};
