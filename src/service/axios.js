import axios from 'axios'
import { Message } from 'element-ui'
import codeMap from '../config/codeMap'
import { sleep } from '../utils'

const TIMEOUT = 5000
const ERR_OK = 0
let cancel
let promiseArr = {}
const CancelToken = axios.CancelToken
// this is the default config
axios.defaults.timeout = TIMEOUT
axios.defaults.headers.post['Content-Type'] = 'application/json'
// create a instance

const instance = axios.create({
  baseURL: '',
  timeout: TIMEOUT,
  headers: []
})
instance.defaults.headers.post['Content-Type'] = 'application/json'

// config Request Interceptors
axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, err => {
  return Promise.reject(err)
})

// config the response interceptors
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
  } else {
    // return 什么由具体需求决定
    return data.data
  }
}, err => {
  if (err && err.response) {
    const {response: {status}} = err
    switch (status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        sleep(1000).then(async () => { await window.location.replace('/login') })
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http 版本不支持该请求'
        break
      default:
        err.message = `连接错误${status}`
    }
    Message({
      type: 'error',
      showClose: true,
      message: err.message
    })
  } else {
    err.message = '连接到服务器失败'
    Message({
      type: 'error',
      showClose: true,
      message: err.message
    })
  }
  return Promise.reject(err)
})
export default {
  get (url, query) {
    return new Promise((resolve) => {
      instance({
        method: 'get',
        url,
        params: query,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => resolve(res))
    })
  },
  post (url, data, name = 'post') {
    return new Promise((resolve) => {
      instance({
        method: name.toLowerCase(),
        url,
        data,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  },
  export (url, data) {
    return new Promise(resolve => {
      instance({
        method: 'get',
        params: data,
        responseType: 'blob',
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      })
    })
  }
}
