//统一请求，统一处理请求结果和绑定,异常通知,可选择callback方式处理请求结果
var utils = require('../lib/utils');
var notification = require('../lib/notification');

module.exports = {

	init: function(obj, bu) {
		var _this = obj;
		var baseUrl = bu;

    function HTTP(options){

      switch (options.method) {
        case 'post':
            return _this.$http.post(baseUrl+options.url,options.param);
            break;
        case 'get':
            return _this.$http.get(baseUrl+options.url);
            break;
        case 'delete':
          return _this.$http.delete(baseUrl+options.url);
          break;
        case 'put':
          return _this.$http.put(baseUrl+options.url,options.param);
          break;
        default:

      }
    };
    //统一出异常和绑定数据
    function requestAndHandlerError(options) {

        if(options.cb !=null && options.cb != undefined ){

          HTTP(options).then(options.cb,function(err){

              notification.alert("服务器异常");
          }
          );
        }else{
          HTTP(options).then(function(res){

              //请求成功，统一处理
              if(res.status === 200){

                  var data = JSON.parse(res.body);

                  if(!isObject(res)){
                    notification.alert(res);
                  }
                  //判断返回的数据是否是数组
                  if(isArray(data.fields)){
                      //数组绑定
                      options.ctx[options.target] = data.fields;
                  }else{
                      //当个对象绑定，遍历target绑定
                      options.target.map(function (target){
                          options.ctx[options.target] = data.fields[target];
                      });
                  }
                  //分页参数处理
              }else{
                  notification.alert(res);
              }
          },function(err){

              notification.alert("服务器异常");
          }
          );
        }
        function isArray(obj) {
          return Object.prototype.toString.call(obj) === '[object Array]';
        }
        function isObject(obj) {
          return Object.prototype.toString.call(obj) === '[Object]';
        }
    }
		return {

			get: function(options) {

        options.method = 'get';
				requestAndHandlerError(options);

			},
			post: function(options) {
        options.method = 'post';
				requestAndHandlerError(options);

			},
      delete: function(options) {
        options.method = 'delete';
				requestAndHandlerError(options);

			},
			put: function(options) {
        options.method = 'put';
        requestAndHandlerError(options);
			}

		}

	}

};
