var utils = require('../lib/utils');

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
      list: function(order) {
				console.log(order.status);
				console.log(utils.toParam(order));
				return _this.$http.get(baseUrl + 'orders?' + utils.toParam(order) );
			},

		}

	}

};
