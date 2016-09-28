var UserService = require('./UserService.js');
var TeamService = require('./TeamService.js');
var VolumeService = require('./VolumeService.js');

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
			TeamService: TeamService.init(model.instance, model.baseUrl)
		}
	}

};
