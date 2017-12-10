import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
  login: false, // 登录状态
  info: {}, // 用户信息
  reset: false, // 是否重置密码
  token: null, // jwt token
  list: {}, // 投票列表
  vote: {
    data: {}, // 投票的信息
    success: false // 创建投票是否成功
  },
  status: false, // 投票是否成功
  detail: {}
}
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
export default store
