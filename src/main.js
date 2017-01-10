import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import { menu } from './config'
import services from './services/index.js'
import notification from './lib/notification'
import filter from './filter/index.js'

import cookie from './lib/cookies.js';

var getCookie = cookie.getCookie;

import 'animate.css'

import loading from 'src/components/page/animation/Loading.vue';

Vue.component('loading', loading);

if (document.domain != 'localhost') {
  document.domain = 'gospely.com';
}

document.title = '控制面板 - Gospel 容器云';
window.notification = notification;

window.baseUrl = "http://" + window.location.host

Vue.use(require('vue-resource'));
Vue.http.options.root = 'http://api.gospely.com/';
Vue.http.headers['x-gospely'] = 'moha';
Vue.http.headers.withCredentials = true;

function getCookie(c_name) {
}

if (getCookie('token') != '' && getCookie('token') != undefined) {
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

router.map(menu);

router.redirect({
  '*': '/dashboard'
});

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
      if (getCookie('token') != '' && getCookie('token') != null && getCookie != undefined) {

              window.location.href = base
      }
  } else {

    if (getCookie('token') == '' || getCookie('token') == null || getCookie == undefined) {

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
