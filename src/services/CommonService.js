//post，get,delete,put等基本请求通用服务
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
        var url = options.url;
        if(query != null && query != undefined && query != '' ){
            options.url = options.url+"?"+query;
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
      },
      update: function(options) {
        request.put(options);
      },
      count: function(options) {

        var query = utils.toParam(options.param);
        var url = options.url;
        if(query != null && query != undefined && query != '' ){
            options.url = options.url+"/number?"+query;
        }
        console.log(query);
        request.get(options);
      },
      containerOperate: function(options) {
        options.url = options.url + "/" + options.param.containerName
        request.get(options);
      },

		}

	}
}
