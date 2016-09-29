var utils = require('../lib/utils');
var HTTP = require('./Http')
module.exports ={

  init: function(obj, bu) {
    var request = HTTP.init(obj, bu)
		return {

      create: function(options) {

				return request.post(options);
			},

			list: function(options) {

        var query = utils.toParam(options.param);
        console.log(options.param);
        var url = options.url;
        if(query != null && query != undefined && query != '' ){
            options.url = "?"+query;
        }
        console.log(query);
				return request.get(options);
			},
			delete: function(options) {
				options.url = options.url + "/" + options.param.id
				request.delete(options);
			},
      getOne: function(options) {
        options.url = options.url + "/" + options.param.id
        request.get(options);
      }

		}

	}
}
