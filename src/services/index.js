var UserService = require('./UserService.js');
var TeamService = require('./TeamService.js');
var VolumeService = require('./VolumeService.js');
var OrderService = require('./VolumeService.js');
var OrderService = require('./OrderService');

var model = {
	instance: undefined,
	baseUrl: 'http://119.29.153.143:9999/'
};

module.exports = {

	init: function(obj) {
		model.instance = obj;

		var tmpHttpGET = model.instance.$http.get;

		return {
			UserService: UserService.init(model.instance, model.baseUrl),
			TeamService: TeamService.init(model.instance, model.baseUrl),
			VolumeService: VolumeService.init(model.instance, model.baseUrl),
			OrderService: OrderService.init(model.instance, model.baseUrl)

		}
	}

};
