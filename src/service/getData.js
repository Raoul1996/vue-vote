import fetch from '../config/fetch'
import Api from '../config/api'
import { getStore } from '../config/localStorage'
/**
 * 获取用户信息
 */

export const getUser = () => fetch(Api.getUser, {user_id: getStore('user_id')})

/**
 * 手机号登录
 */
/* eslint-disable */
export const sendLogin = (mobile, password, validate_token) => fetch(Api.login, {
  mobile,
  password,
  validate_token
}, 'POST')
export const sendRegister = (mobile, password, gender) => fetch(Api.register, {
  mobile,
  password,
  gender
}, 'POST')


/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {
  username,
  password,
  captcha_code
}, 'POST')

/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout')

/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {
  username,
  oldpassWord,
  newpassword,
  confirmpassword,
  captcha_code
}, 'POST')
