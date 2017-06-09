import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Map from '../components/map'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'map'
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    }
  ]
})
