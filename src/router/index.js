import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Nav from '../components/nav'
import Login from '../pages/login'
import Register from '../pages/register'
import ChangePassword from '../pages/changePassword'
import Forget from '../pages/forget'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: 'components'
      component: Login
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/nav',
      name: 'Nav',
      component: Nav
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    }
  ]
})
