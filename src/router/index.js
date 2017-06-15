import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import components from '../components/components'
import Login from '../components/login'
import Register from '../components/register'
import ChangePassword from '../components/changePassword'
import Forget from '../components/forget'
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
      path: '/components',
      name: 'components',
      component: components
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
