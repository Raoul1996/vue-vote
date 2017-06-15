// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
// import { routerMode } from './config/env'
import store from './store'
// import './config/rem'
import { Button, Select, Form, FormItem, Input } from 'element-ui'
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
router.beforeEach((to, from, next) => {
  // 模拟登陆状态
  let isLogin = store.state.login
  if (to.path === ('/register' || '/forget')) {
    next()
  } else if (!isLogin) {
    if (to.path !== '/login') {
      return next({path: '/login'})
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      return next({path: '/'})
    }
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
