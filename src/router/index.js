import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import components from '../components/components'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'components'
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
    }
  ]
})
