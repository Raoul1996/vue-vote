import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/pages/Hello'
import store from '../store'
// 配置路由懒加载
const Nav = () => import(/* webpackChunkName: "content" */ 'components/nav.vue')
const Login = () => import(/* webpackChunkName: "user" */ 'pages/login.vue')
const Register = () => import(/* webpackChunkName: "user" */ 'pages/register.vue')
const profile = () => import(/* webpackChunkName: "user" */ 'pages/profile.vue')
const Update = () => import(/* webpackChunkName: "user" */ 'pages/update.vue')
const Forget = () => import(/* webpackChunkName: "user" */ 'pages/forget.vue')
const Vote = () => import(/* webpackChunkName: "vote" */ 'pages/vote.vue')
const Content = () => import(/* webpackChunkName: "vote" */ 'pages/detail.vue')
const Create = () => import(/* webpackChunkName: "vote" */ 'pages/create.vue')

Vue.use(Router)
/**
 * @param requireAuth: 是否需要在登录之后才能进
 */
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/vote',
      redirect: 'vote/doing'
    },
    {
      path: '/create',
      name: 'Create',
      meta: {
        requireAuth: false
      },
      component: Create
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        requireAuth: false
      },
      component: Login
    },
    {
      path: '/vote/:type',
      name: 'vote',
      meta: {
        requireAuth: false
      },
      component: Vote
    },
    {
      path: '/vote/:type/:id',
      name: 'content',
      meta: {
        requireAuth: false
      },
      component: Content
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        requireAuth: false
      },
      component: profile
    },
    {
      path: '/nav',
      name: 'Nav',
      meta: {
        requireAuth: false
      },
      component: Nav
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        requireAuth: false
      },
      component: Register
    },
    {
      path: '/update',
      name: 'update',
      meta: {
        requireAuth: false
      },
      component: Update
    },
    {
      path: '/forget',
      name: 'Forget',
      meta: {
        requireAuth: false
      },
      component: Forget
    },
    {
      path: '*',
      name: '404',
      component: () => import('pages/404.vue')
    }
  ]
})
router.beforeResolve((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
// router.go({
//   path: '/vote/doing',
//   force: true
// })
export default router
