
module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

		return {

			create: function(order) {
				console.log(team.name);
				return _this.$http.post(baseUrl + 'teams',team);
			},
			getOne: function(id) {
				console.log(id);
				return _this.$http.get(baseUrl + 'orders',{creator: id});
			},
      list: function(orders) {
				console.log(id);
				return _this.$http.get(baseUrl + 'orders',orders);
			},

		}

	}

};
