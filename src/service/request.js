import API from '../config/api'
import { params2url } from '../utils'
import instance from './axios'

export function userLogout (data) {
  return instance.post(API.logout, data)
}

export function getUser (data) {
  return instance.get(API.info, data)
}

export function delUser (data) {
  return instance.post(API.del, data)
}

export function forgetPassword (data) {
  return instance.post(API.forget, data)
}

export function resetPassword (data) {
  return instance.post(API.password, data)
}

export function getVote (query) {
  return instance.get(API.vote, query)
}

export function createVote (data) {
  return instance.post(API.create, data)
}

export function getDetail (param) {
  return instance.get(params2url(API.detail, param))
}

export function submit (param, data) {
  return instance.post(params2url(API.submit, param), data)
}

export function userLogin (data) {
  return instance.post(API.login, data)
}

export function userRegister (data) {
  return instance.post(API.register, data)
}
