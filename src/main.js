import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import {menu} from './config'

import services from './services/index.js'

import notification from './lib/notification'

import 'animate.css'

// if(document.domain == 'localhost') {
// 	window.debug = true;
// }else {
// 	document.domain = 'dash.dodora.cn';
// 	window.debug = false;
// }

if(document.domain != 'localhost') {
    document.domain = 'gospely.com';
}

document.title = 'Dodora 龙猫云';
window.notification = notification;

function getCookie(name){
         var strCookie=document.cookie;
         var arrCookie=strCookie.split("; ");
         for(var i=0;i<arrCookie.length;i++){
               var arr=arrCookie[i].split("=");
               if(arr[0]==name)return arr[1];
         }
         return "";
}
//初始化用户登录状态
localStorage.login = typeof localStorage.login == 'undefined' ? 'false' : localStorage.login;
localStorage.userData = typeof localStorage.userData == 'undefined' ? '' : localStorage.userData;
localStorage.accessToken = typeof localStorage.accessToken == 'undefined' ? '' : localStorage.accessToken;
//从cookie中获取token
if(localStorage.accessToken == undefined) {
    localStorage.accessToken = getCookie('token');
    console.log(accessToken);
}

//初始化XMLHttpRequest RestfulAPI
Vue.use(require('vue-resource'));

Vue.http.options.root = 'http://api.gospely.com/';
Vue.http.headers['x-gospely'] = 'moha';
Vue.http.headers.withCredentials = true;
if(localStorage.login == 'true') {
	Vue.http.headers.common['Authorization'] = 'Basic ' + localStorage.accessToken;
}
Vue.http.headers.common['Authorization'] = 'test';

Vue.use(VueRouter);

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true,
    linkActiveClass: 'active'
});

window.router = router;

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
router.map(menu);

router.redirect({
    '*': '/dashboard'
});

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, 'app');

//路由请求开始时调用
router.beforeEach(function (route) {
    document.title = route.to.label + ' | Dodora 龙猫云';
    route.next();
});

//路由请求结束后调用
router.afterEach(function () {

});

new Vue({
  el: 'title',

	data: {
		title: 'Gospel - 控制台'
	},
	ready: function() {

    var store = services.init(this);
    window.services = store;
	}
});

window.Vue = Vue;
