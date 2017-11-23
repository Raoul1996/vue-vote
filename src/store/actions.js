import { getUser, sendLogin } from '../service/getData'
/* eslint-disable no-unused-vars */
import { USER_LOGIN, OUT_LOGIN, GET_USERINFO } from './mutation-types'
export default {
  async getUserInfo ({commit, state}) {
    let res = await getUser()
    commit(GET_USERINFO, res)
  },
  async UserLogin ({commit, state}) {
    let res = await sendLogin()
    commit(USER_LOGIN, res)
  },
  [USER_LOGIN] ({commit}, state) {
    commit(USER_LOGIN, state)
  }
}
