import Vue from 'vue'
import Router from 'vue-router'


 import head from 'components/head'

 import register from 'components/register'
 import home from 'components/home/home'
 import homes from 'components/homes/homes'


  import classify from 'components/classify/classify'
  import  shopping from 'components/shopping-cart/shopping-cart'
  import  personals from 'components/centers/centers'
  // import  personal from 'components/personal-cneter/personal-cneter'

  import search_result from 'components/search/search_result'

  import  goods_details from 'components/goods_details/goods_details'

  import goods_introduce from 'components/goods_details/goods_introduce'

  import goods_comment from 'components/goods_details/goods_comment'

  import Myorder from 'components/centers/myOrder/myOrder'

  import Msyorder from 'components/nav/scroll'



let router = new Router({
  // mode: 'history',
  linkActiveClass: 'actives',
  // hashbang:false,
  // history:true,
  routes: [
      {
      path: "*",
      redirect: "/"
    },
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login/login'], resolve),
    },
    {
      path: '/head',
      name: 'head',
      component: head
    },
    {
      path: '/goods_details',
      name: 'goods_details',
      component:goods_details,
      redirect:'/goods_details/goods_introduce',
      children:[
        { path: '/goods_details/goods_introduce', component: goods_introduce},
        { path: '/goods_details/goods_comment', component: goods_comment},
      ],
      },
      {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        { path: '/home/index', component: homes},
        { path: '/home/classify', component: classify},
        { path: '/home/shopping_cart', component: shopping},
        { path: '/home/personal_center', component: personals},
      ]
    },{
      path: '/search_result',
      name: 'search_result',
      component: search_result
    },{
      path: '/myorder',
      name: 'Myorder',
      component: Myorder,

    },

    {
      path: '/scrolls',
      name: 'scrolls',
      component: Msyorder,
    }

  ]
});

// router.beforeEach((to, from, next) => {
//
// });


Vue.use(Router);


// router.





export default router;
