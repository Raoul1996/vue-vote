import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/pages/Hello'
import store from '../store'
// 配置路由懒加载
const User = () => import('pages/user.vue')
const Nav = () => import('components/nav.vue')
const Login = () => import('pages/login.vue')
const Register = () => import('pages/register.vue')
const Update = () => import('pages/update.vue')
const Forget = () => import('pages/forget.vue')
const Vote = () => import('pages/vote.vue')
const Content = () => import('pages/detail.vue')
const NotFound = () => import('pages/NotFound.vue')

Vue.use(Router)
/**
 * @param requireAuth: 是否需要在登录之后才能进
 */
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: {
        requireAuth: false
      },
      component: Login
    },
    {
      path: '/',
      // redirect: 'components'
      component: Login
    },
    {
      path: '/vote',
      name: 'vote',
      meta: {
        requireAuth: false
      },
      component: Vote
    },
    {
      path: '/vote/:id',
      name: 'content',
      meta: {
        requireAuth: false
      },
      component: Content
    },
    {
      path: '/user',
      name: 'User',
      meta: {
        requireAuth: false
      },
      component: User
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
      name: 'notFound',
      component: NotFound
    }
  ]
})
router.beforeResolve((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
