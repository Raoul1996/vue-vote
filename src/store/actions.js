import {
  userLogin,
  getUser,
  userRegister,
  createVote,
  submit,
  getDetail,
  forgetPassword,
  resetPassword,
  getVote,
  sendMail,
  getStatistic,
  getOwnVote
} from '../service/request'
import {
  USER_LOGIN,
  USER_INFO,
  USER_TOKEN,
  VOTE_MSG,
  SUBMIT_VOTE,
  VOTE_DETAIL_OPTIONS,
  VOTE_DETAIL_FETCH,
  USER_FORGET,
  LOGOUT,
  RESET_PASS,
  VOTE_LIST,
  SEND_MAIL,
  VOTE_STATISTIC,
  OWN_VOTE
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
  async submitAction ({commit, state}, {param, data}) {
    const success = await submit(param, data)
    commit(SUBMIT_VOTE, success)
  },
  async getDetailAction ({commit, state}, param) {
    const res = await getDetail(param)
    console.log(res)
    commit(VOTE_DETAIL_OPTIONS, res.options)
    commit(VOTE_DETAIL_FETCH, !!res.id)
  },
  async sendMailAction ({commit, state}, data) {
    const mail = await sendMail(data)
    commit(SEND_MAIL, mail)
  },
  // 这里是因为统计组件中传递参数的时候必须要将 statistic 的值传入，所以使用 promise 将其返回给组件，保证异步逻辑
  async getStatisticAction ({commit, state}, data) {
    const statistic = await getStatistic(data)
    commit(VOTE_STATISTIC, statistic)
    return statistic
  },
  async getOwnVoteAction ({commit, state}, data) {
    const ownVote = await getOwnVote(data)
    commit(OWN_VOTE, ownVote)
  }
}
