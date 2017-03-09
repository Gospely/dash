import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import { menu } from './config'
import services from './services/index.js'
import notification from './lib/notification'
import filter from './filter/index.js'

import cookie from './lib/cookies.js';

var getCookie = cookie.getCookie;
var setCookie = cookie.setCookie;

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
var loginUrl = window.baseUrl + '/#!/accounts/login';

if (getCookie('token') != '' && getCookie('token') != undefined) {
  Vue.http.headers.common['Authorization'] = getCookie('token');
} else {
    var urls = window.location.href.split('?')
    console.log(urls);
    if(urls.length > 1 && urls[0] == window.baseUrl + "/#!/" && urls[1] != '') {
        urls = urls[1].split("&");
        if(urls.length > 1) {
          setCookie("token", urls[0].split("=")[1]);
          setCookie("user", urls[1].split("=")[1]);
          console.log(urls[1].split("=")[1]);
          localStorage.token = getCookie('token');
          localStorage.user = getCookie('user');
          Vue.http.headers.common['Authorization'] = getCookie('token');
          Vue.http.get('http://localhost:8089/users/' + getCookie('user')).then(function(res){
              console.log(res);
              var data = res.data;
              if(data.code == 1) {
                  setCookie('user',res.data.fields.id,15 * 24 * 60 * 60 * 1000);
                  setCookie('token',res.data.fields.token, 15 * 24 * 60 * 60 * 1000);
                  setCookie('userName',res.data.fields.name, 15 * 24 * 60 * 60 * 1000);
                  setCookie('host',res.data.fields.host, 15 * 24 * 60 * 60 * 1000);
                  localStorage.setItem("ide",res.data.fields.ide);
                  localStorage.setItem("ideName",res.data.fields.ideName);
                  localStorage.setItem("token",res.data.fields.token);
                  localStorage.setItem("userName",res.data.fields.name);
              }else {
                  notification.error('登录失败');
                  localStorage.removeItem("isActive");
                  cookie.setCookie('token','','Thu, 01 Jan 1970 00:00:00 GMT');
                  cookie.setCookie('user','','Thu, 01 Jan 1970 00:00:00 GMT');
                  window.location.href = loginUrl;
              }

          });
        }
    }
}
Vue.use(VueRouter);

var router = new VueRouter({
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
  console.log('beforeEach');

  console.log(route);

  console.log(loginUrl);
  var test = route.to.path.split("?")[0];
  if(!test){
      test =  window.location.href.split("?")[0];
  }
  console.log(test);
  console.log(getCookie('token'));
  if(!getCookie('token')){
      if((test == '/accounts/login' || test == '/accounts/register')){
          route.next();
      }
      window.location.href = loginUrl
  }else {
      if((test == '/accounts/login' || test == '/accounts/register')){
          route.to.path = route.from.path;
          route.next();
      }else {
          route.next();
      }
  }
});

//路由请求结束后调用
router.afterEach(function(route) {

    console.log(loginUrl);
    var test = route.to.path.split("?")[0];
    if(!test){
        test =  window.location.href.split("?")[0];
    }
    console.log(test);
    console.log(getCookie('token'));
    if(!getCookie('token')){
        if((test == '/accounts/login' || test == '/accounts/register')){
        }
        window.location.href = loginUrl
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
