import API from '../config/api'
import { params2url } from '../utils'
import instance from './axios'

export default {
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
    return instance.get(API.vote, query)
  },
  createVote (data) {
    return instance.post(API.create, data)
  },
  getDetail (query, param) {
    return instance.get(params2url(API.detail, param), query)
  },
  submit (param, data) {
    return instance.post(params2url(API.submit, param), data)
  }
}
