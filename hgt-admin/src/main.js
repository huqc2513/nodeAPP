import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import moment from 'moment';

Vue.use(moment);


//import './assets/theme/theme-green/index.css'


import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import router from './routes'

import Mock from './mock'
Mock.bootstrap();

import 'font-awesome/css/font-awesome.min.css'



Vue.use(VueRouter)
Vue.use(Vuex)





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

