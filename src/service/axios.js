import axios from 'axios'
import API from '../config/api'
import { Message } from 'element-ui'
import codeMap from '../config/codeMap'
import { query2url, sleep } from '../utils'

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
  // let token = null
  // if (data && (data.token !== undefined)) {
  //   token = data.token
  // }
  // 在发送请求之前，如果不明确 token 为 false 的话，就会添加 Authorization 头
  // 这里不能使用 !token === false, 因为 !undefined === false
  // if (token !== false) {
  if (localStorage.getItem('token')) {
    // 在这里添加 Authorization 请求头，目的是携带 token 给后端
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    // 这里是因为后端支持 token 这个请求头
    // config.headers.token = `${localStorage.getItem('token')}`.replace(/(^")|("$)/g, '') || ''
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
    Message({
      type: 'error',
      showClose: true,
      message: `${(codeMap[code] || 'unKnowError').toString()}: ${code}`
    })
    return Promise.reject(config)
  } else if (code === NEED_LOGIN) {
    sleep(1000).then(async () => { await window.location.replace('/') })
  } else {
    // console.log(data)
    console.log(data['data'])
    return data['data']
  }
}, err => {
  if (err && err['message']) {
    Message({
      type: 'error',
      showClose: true,
      message: err.message
    })
  } else {
    Message({
      type: 'error',
      showClose: true,
      message: err
    })
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
        const {token} = response
        window.localStorage.setItem('token', token)
        // TODO: 在这里集中处理 Token
        return response
      }
    )
  },
  userLogout (data) {
    return instance.post(API.logout, data)
  },
  getUser (data) {
    return instance.get(API.info, data)
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
  getVote (query) {
    return instance.get(query2url(API.vote, query))
  },
  createVote (data) {
    return instance.post(API.create, data)
  },
  getDetail (query, param) {
    return instance.get(query2url(API.detail, query, param))
  },
  submit (query, param, data) {
    return instance.post(query2url(API.submit, query, param), data)
  }
}
export default requestService
