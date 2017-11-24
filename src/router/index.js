import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/pages/Hello'
import store from '../store'
// 配置路由懒加载
const Users = () => import('pages/users')
const Nav = () => import('components/nav')
const Login = () => import('pages/login')
const Register = () => import('pages/register')
const ChangePassword = () => import('pages/changePassword')
const Forget = () => import('pages/forget')
const Vote = () => import('pages/vote.vue')
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
      path: '/hello',
      name: 'Hello',
      meta: {
        requireAuth: false
      },
      component: Users
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
      component: ChangePassword
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
