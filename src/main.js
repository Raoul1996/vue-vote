// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { routerMode } from './config/env'
import VeHistogram from 'v-charts/lib/histogram'
import store from './store'
// import './config/rem'
import {
  Autocomplete,
  Button,
  Select,
  Form,
  FormItem,
  Input,
  Card,
  Checkbox,
  CheckboxGroup,
  Menu,
  MenuItem,
  Submenu,
  Col,
  Row,
  TimePicker,
  Option,
  DatePicker,
  Switch,
  RadioGroup,
  Radio,
  Upload,
  MessageBox,
  Message,
  Loading,
  Notification
} from 'element-ui'
Vue.component(VeHistogram.name, VeHistogram)
Vue.config.productionTip = false
Vue.use(Autocomplete)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Switch)
Vue.use(Option)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Upload)
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
  router,
  store,
  render: h => h(App)
}).$mount('#app')
