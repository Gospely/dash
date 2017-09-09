
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			create: function(team) {
				return _this.$http.post(baseUrl + 'teams',team);
			},

			list: function(id) {
				;
				return _this.$http.get(baseUrl + 'teams',{creator: id});
			},
			delete: function(id) {
				;
				return _this.$http.delete(baseUrl + 'teams/'+id);
			}

		}

	}

};
