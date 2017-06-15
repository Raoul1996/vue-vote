/* eslint-disable no-unused-vars */
import { USER_LOGIN, OUT_LOGIN, GET_USERINFO } from './mutation-types'
import { getStore, setStore } from '../config/localStorage'
export default {
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },
  [USER_LOGIN] (state, info) {
    state.login = info
  }
}
