var UserService = require('./UserService.js');
var TeamService = require('./TeamService.js');
var VolumeService = require('./VolumeService.js');
var OrderService = require('./VolumeService.js');
var OrderService = require('./OrderService');
var Common = require('./CommonService');

var model = {
	instance: undefined,
	baseUrl: 'http://localhost:8089/'
	//baseUrl: 'http://api.gospely.com:9999/'
	//baseUrl: 'http://api.gospely.com/'
};

module.exports = {

	init: function(obj) {
		model.instance = obj;

		var tmpHttpGET = model.instance.$http.get;

		return {
			UserService: UserService.init(model.instance, model.baseUrl),
			TeamService: TeamService.init(model.instance, model.baseUrl),
			VolumeService: VolumeService.init(model.instance, model.baseUrl),
			OrderService: OrderService.init(model.instance, model.baseUrl),
			Common: Common.init(model.instance, model.baseUrl),

		}
	}

};
