import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import { menu } from './config'
import services from './services/index.js'
import notification from './lib/notification'
import filter from './filter/index.js'

import 'animate.css'

import loading from 'src/components/page/animation/Loading.vue';

Vue.component('loading', loading);


// if(document.domain == 'gospely.com') {
// 	window.debug = true;
// }else {
// 	document.domain = 'dash.dodora.cn';
// 	window.debug = false;
// }

if (document.domain != 'localhost') {
  document.domain = 'gospely.com';
}

document.title = '控制面板 - Gospel 容器云';
window.notification = notification;

window.baseUrl = "http://" + window.location.host
  //初始化XMLHttpRequest RestfulAPI
Vue.use(require('vue-resource'));
Vue.http.options.root = 'http://api.gospely.com/';
Vue.http.headers['x-gospely'] = 'moha';
Vue.http.headers.withCredentials = true;
//localStorage.removeItem('token');

function getCookie(c_name) {
  if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";",c_start);
      if (c_end == -1) c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return "";
}

if (getCookie('token') != '' && getCookie('token') !=
  undefined) {
  Vue.http.headers.common['Authorization'] = getCookie('token');
} else {
  // var urls = window.location.href.split('?')
  // if (urls[0] == window.baseUrl + "/" && urls[1] != '') {
  //   console.log(window.location.search);
  //   localStorage.setItem("token", window.location.search.split("%20=%20")[1]);
  //   console.log(window.location.search.split("%20=%20")[1]);
  // }
}
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
window.currentUser = localStorage.getItem("user");
window.currentUserName = localStorage.getItem("userName");

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
router.beforeEach(function(route) {
  document.title = route.to.label + ' | 控制面板 - Gospel 容器云';
  var from = route.from;

  if (route.from.name == "appdetail") {
    clearInterval(window.monitorInterval);
  }

  route.next();
});

//路由请求结束后调用
router.afterEach(function() {

  var base = "http://" + window.location.host
  var loginUrl = base + "/#!/accounts/login";
  var register = base + '/#!/accounts/register';
  if (window.location.href == loginUrl || window.location.href == register || window.location.href == loginUrl + "?where=fromIde") {

  } else {

    if (getCookie('token') == '' || getCookie('token') ==
      null || getCookie == undefined) {

      window.location.href = loginUrl
    }
  }

});

//初始化过滤器
filter.init(Vue);

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
