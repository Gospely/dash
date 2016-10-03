var notification = require('../lib/notification');
//统一请求，统一处理请求结果和绑定,异常通知,可选择callback方式处理请求结果
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

									console.log(res);
                  var data = res.body;

									console.log(data);
									if(data != 'Done!') {
										//判断返回的数据是否是数组
										if(isArray(data.fields)){
												//数组绑定
												options.ctx.$data.all = data.all;

												if(options.ctx[options.target] == null || options.ctx[options.target] == undefined ){
														options.ctx.fields = data.fields
												}else{
														options.ctx[options.target] = data.fields;
												}
										}else{

												console.log(options.ctx.$data);
												for(var field in data.fields){
														console.log(typeof field);
														//暂时判断，todo:转换成一个escape模块
														if( !(field == 'password' || field == 'all' || field == 'cur')   ) {
																if(Reflect.has(options.ctx.$data, field)){
																		Reflect.set(options.ctx.$data, field, Reflect.get(data.fields, field))
																}
														}
												}
										}
									}
									if(options.msg != null && options.msg != undefined){
											notification.alert(options.msg.success);
									}
									if(options.reload != null && options.reload != undefined){

											console.log("reload");
											console.log("data cur" + options.ctx.$data.cur);
											console.log("data" + data.cur);

											options.reload(options.ctx.$data.cur);
									}
                  //分页参数处理
              }else{
								if(options.msg != null && options.msg != undefined){
										notification.alert(options.msg.failed);
								}
              }
          },function(err){

							//切换提醒方式

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
