import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import VueRouter from 'vue-router'

import order from './views/nav2/order'

import  classify from './views/nav1/classify'

let routes = [

    {
        path: '/login',
        component: Login,
        name: '登陆',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        // name: '/',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true
            ,
              meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              }
              },
            { path: '/table', component: Table, name: '商品列表',
              meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
              }
              },
            { path: '/form', component: Form, name: '表单'
            },
            { path: '/order', component: order, name: '订单',
              meta: {
                requireAuth: true,
              }
              },
              { path: '/user', component: user, name: '用户' ,
                meta: {
                  requireAuth: true,
                }
              },
            {
              path: '/product/classify',
              component: classify,
              name: '分类' ,
              meta: {
                requireAuth: true,
              }
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];
const router = new VueRouter(
  {
    routes
  }
);


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("admin")){  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})


export default router;
