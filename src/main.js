// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
// import { routerMode } from './config/env'
import store from './store'
// import './config/rem'
import axios from './service/axios'
import {
  Button,
  Select,
  Form,
  FormItem,
  Input,
  Row,
  Card,
  Col,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Menu,
  MenuItem,
  Submenu,
  MessageBox,
  Message,
  Loading,
  Notification
} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.prototype.$store = store
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  axios,
  router,
  store,
  render: h => h(App)
})
  .$mount('#app')
