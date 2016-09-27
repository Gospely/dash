var UserService = require('./UserService.js');
var model = {
	instance: undefined,
	baseUrl: 'http://localhost:8089/'
};

module.exports = {

	init: function(obj) {
		model.instance = obj;

		var tmpHttpGET = model.instance.$http.get;

		return {
			UserService: UserService.init(model.instance, model.baseUrl),
		}
	}

};
