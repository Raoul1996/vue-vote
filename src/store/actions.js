import {
  userLogin,
  getUser,
  userRegister,
  createVote,
  submit,
  getDetail,
  forgetPassword,
  resetPassword,
  getVote
} from '../service/request'
/* eslint-disable no-unused-vars */
import {
  USER_LOGIN,
  USER_INFO,
  USER_TOKEN,
  VOTE_MSG,
  SUBMIT_VOTE,
  VOTE_DETAIL_OPTIONS,
  USER_FORGET,
  LOGOUT,
  RESET_PASS,
  VOTE_LIST
} from './mutation-types'

export default {
  async infoAction ({commit, state}, data) {
    let res = await getUser(data)
    commit(USER_INFO, res)
  },
  async loginAction ({commit, state}, data) {
    const res = await userLogin(data)
    if (res && res.token) {
      window.localStorage.setItem('token', res.token)
      commit(USER_TOKEN, res.token)
    }
    commit(USER_LOGIN, true)
    commit(USER_INFO, res)
  },
  async registerAction ({commit, state}, data) {
    const res = await userRegister(data)
    // TODO: 返回用户信息，修改后端
    commit(USER_INFO, res)
  },
  async forgetAction ({commit, state}, data) {
    const bool = await forgetPassword(data)
    commit(USER_FORGET, bool)
    commit(LOGOUT)
  },
  async resetPasswordAction ({commit, state}, data) {
    const bool = await resetPassword(data)
    commit(RESET_PASS, bool)
  },
  async createVoteAction ({commit, state}, data) {
    const success = await createVote(data)
    commit(VOTE_MSG, {data, success})
  },
  async getVoteListAction ({commit, state}, data) {
    const list = await getVote(data)
    commit(VOTE_LIST, list)
  },
  // TODO: 这里考虑重构
  async submitAction ({commit, state}, param, data) {
    const success = await submit(param, data)
    commit(SUBMIT_VOTE, success)
  },
  // TODO: 这里考虑重构
  async getDetailAction ({commit, state}, param) {
    const detail = await getDetail(param)
    commit(VOTE_DETAIL_OPTIONS, detail)
  }
}
