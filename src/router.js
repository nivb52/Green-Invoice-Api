import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import UserInfo from './views/UserInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      // route level code-splitting
      // this generates a separate chunk (UserInfo.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "UserInfo" */ './views/UserInfo.vue')
    }
  ]
})
