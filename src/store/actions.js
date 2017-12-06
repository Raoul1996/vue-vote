// import api from '../service/axios'
/* eslint-disable no-unused-vars */
import { USER_LOGIN, OUT_LOGIN, GET_USERINFO } from './mutation-types'
export default {
  // async getUserInfo ({commit, state}) {
  //   let res = await api.getUser()
  //   commit(GET_USERINFO, res)
  // },
  // async UserLogin ({commit, state}) {
  //   let res = await api.userLogin()
  //   commit(USER_LOGIN, res)
  // },
  [USER_LOGIN] ({commit}, state) {
    commit(USER_LOGIN, state)
  }
}
