// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Vuex from 'vuex';

import App from './App'
import router from './router'

import configs from '../config/config.js'

import axios from 'axios';

import $ from 'jquery'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import storeConfig from './vuex/store'

Vue.use(Vuex);
Vue.use(MuseUI)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'



Vue.use(ElementUI)

import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

// Vue.use(Vuetify)




Vue.config.productionTip = false;


//let env = process.env.NODE_ENV;

Vue.prototype.$http=axios;


new Vue({
  el: '#app',
  router,
  store:storeConfig,
  template: '<App/>',
  components: { App }
});
