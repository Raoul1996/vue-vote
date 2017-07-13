/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from './router'
import store from './store'
import * as types from './store/mutation-types'

// this is the default config

axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'
// create a instance

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})
instance.defaults.headers.post['Content-Type'] = 'application/json'

// config Request Interceptors
// TODO: can I use the interceptors on axios rather the instance?
// TODO: what the config object meaning? where can I found it?
axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `token ${localStorage.getItem('token')}`
      .replace(/(^")|("$)/g, '')
  }
  return config
}, err => {
  // use the reject method of the promise object
  return Promise.reject(err)
})

// config the response interceptors

axios.interceptors.response.use = instance.interceptors.response.use
instance.interceptors.response.use(config => {
  return config
}, err => {
  Promise.reject(err)
})
const api = {
  // config the api routers
  userRegister (data) {
    return instance.post('api/register', data)
  },
  userLogin (data) {
    return instance.post('api/login', data)
  },
  userLogout (data) {
    return instance.post('api/logout', data)
  },
  getUser (data) {
    return instance.get('api/user', data)
  },
  delUser (data) {
    return instance.post('api/del', data)
  },
  forgetPassword (data) {
    return instance.post('api/forget', data)
  },
  resetPassword (data) {
    return instance.post('api/password', data)
  }
}
export default api
