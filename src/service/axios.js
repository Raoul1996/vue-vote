/* eslint-disable no-unused-vars */
import axios from 'axios'
import router from '../router/index'
import store from '../store/index'
import * as types from '../store/mutation-types'
import API from '../config/api'
import { Message, Alert } from 'element-ui'
import codeMap from '../config/codeMap'
import { sleep } from '../utils'

const TIMEOUT = 5000
const ERR_OK = 0
const NEED_LOGIN = 20004
// this is the default config
axios.default.timeout = TIMEOUT
axios.defaults.headers.post['Content-Type'] = 'application/json'
// create a instance

const instance = axios.create({
  baseURL: ''
})
instance.defaults.headers.post['Content-Type'] = 'application/json'

// config Request Interceptors
// TODO: can I use the interceptors on axios rather the instance?
// TODO: what the config object meaning? where can I found it?
axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
  const {data} = config
  // let token = null
  // if (data && (data.token !== undefined)) {
  //   token = data.token
  // }
  // 在发送请求之前，如果不明确 token 为 false 的话，就会添加 Authorization 头
  // 这里不能使用 !token === false, 因为 !undefined === false
  // if (token !== false) {
  if (localStorage.getItem('token')) {
    // 在这里添加 Authorization 请求头，目的是携带 token 给后端
    // config.headers.Authorization = `token ${localStorage.getItem('token')}`.replace(/(^")|("$)/g, '')
    // 这里是因为后端支持 token 这个请求头
    config.headers.token = `${localStorage.getItem('token')}`.replace(/(^")|("$)/g, '') || ''
    // } else {
    //   console.log(codeMap[NEED_LOGIN].toString())
    //   return Promise.reject(config)
    // }
  }
  return config
}, err => {
  // use the reject method of the promise object
  return Promise.reject(err)
})

// config the response interceptors
// 在这里配置后端的拦截器
axios.interceptors.response.use = instance.interceptors.response.use
instance.interceptors.response.use((config) => {
  // data 即为后端返回的数据
  const {data, data: {code}} = config
  if (code !== ERR_OK) {
    Message.error(`${codeMap[code].toString() || 'unKnowError'}: ${code}`)
    return Promise.reject(config)
  } else if (code === NEED_LOGIN) {
    sleep(1000).then(async () => { await window.location.replace('/') })
  } else {
    return data
  }
}, err => {
  if (err && err['message']) {
    Message.error(`${err.message}: ${500}`)
  } else {
    Message.error(err)
  }
  // else {
  //   Message.error(`${codeMap[NEED_LOGIN].toString() || 'unKnowError'}: ${NEED_LOGIN}`)
  //   sleep(1000).then(async () => { await window.location.replace('/') })
  // }
  return Promise.reject(err)
})

const requestService = {
  // config the api routers
  userRegister (data) {
    return instance.post(API.register, data)
  },
  userLogin (data) {
    return instance.post(API.login, data).then(
      (response) => {
        const {data: {token}} = response
        // TODO: 在这里集中处理 Token
        return response
      }
    )
  },
  userLogout (data) {
    return instance.post(API.logout, data)
  },
  getUser (data) {
    return instance.get(API.getUser, data)
  },
  delUser (data) {
    return instance.post(API.del, data)
  },
  forgetPassword (data) {
    return instance.post(API.forget, data)
  },
  resetPassword (data) {
    return instance.post(API.password, data)
  },
  getVote (data) {
    return instance.get(API.vote, data)
  }
}
export default requestService
