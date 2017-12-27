import {
  USER_LOGIN,
  LOGOUT,
  USER_INFO,
  RECORD_USER_INFO,
  USER_TOKEN,
  VOTE_MSG,
  SUBMIT_VOTE,
  VOTE_DETAIL_OPTIONS,
  VOTE_DETAIL_FETCH,
  VOTE_DETAIL_MSG,
  USER_FORGET,
  RESET_PASS,
  VOTE_LIST,
  SEND_MAIL,
  VOTE_STATISTIC,
  OWN_VOTE
} from './mutation-types'
import { setStore } from 'src/config/localStorage'

export default {
  [LOGOUT] (state) {
    state = null
    window.localStorage.clear()
  },
  // 存储用户信息
  [USER_INFO] (state, info) {
    state.info = info
    setStore('user', info)
  },
  // 存储登陆状态
  [USER_LOGIN] (state, bool) {
    state.login = bool
  },
  // 存储 token
  [USER_TOKEN] (state, token) {
    state.token = token
  },
  // 记录用户信息
  [RECORD_USER_INFO] (state, info) {
    state.userInfo = info
    state.login = true
  },
  [USER_FORGET] (state, bool) {
    state.reset = bool
  },
  [RESET_PASS] (state, bool) {
    state.reset = bool
  },
  [VOTE_LIST] (state, list) {
    state.list = list
  },
  /**
   * 用来保存用户的投票信息
   * @param state
   * @param vote 投票的数据，是否创建成功
   */
  [VOTE_MSG] (state, vote) {
    state.vote.data = vote.data
    state.vote.success = vote.success
  },
  [SUBMIT_VOTE] (state, success) {
    state.status = success
  },
  [VOTE_DETAIL_OPTIONS] (state, options) {
    state.detail.options = options
  },
  /**
   * 是否需要重新获取投票列表
   * @param state
   * @param options
   */
  [VOTE_DETAIL_FETCH] (state, options) {
    state.detail.fetch = options
  },
  [VOTE_DETAIL_MSG] (state, vote) {
    state.detail.vote = vote
  },
  [SEND_MAIL] (state, mail) {
    state.mail = mail
  },
  [VOTE_STATISTIC] (state, statistic) {
    state.statistic = statistic
  },
  [OWN_VOTE] (state, ownVote) {
    state.ownVote = ownVote
  }
}
