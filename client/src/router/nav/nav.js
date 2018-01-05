import Vue from 'vue'
import Router from 'vue-router'

import  nav from 'components/nav/nav'
import {getgoodsList} from "../../../config/api";

import goodslist from 'components/goodslist/goodslist'
Vue.use(Router);

export default new Router({
  routes: [

    {
      path: '/nav',
      name: 'navs',
      component: nav,
      children: [
        {
          path: 'goodslist',
          component: goodslist
        }
      ]
    }
  ]
})
