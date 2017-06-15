export default {
  getLoginStatus: (state) => {
    const login = state.login
    return {
      login: login
    }
  }
}
