// API HOST 是本地的 mock server
const __APIHOST__ = 'http://localhost:3000/api'
const __HOST__ = 'http://vote.helloyz.cn'

const userApiMaker = (path) => {
  return `${__APIHOST__}/${path}`
}
const ApiMaker = (path) => {
  return `${__HOST__}/${path}`
}
export default {
  host: userApiMaker(''),
  login: ApiMaker('user/login'),
  register: ApiMaker('user/register'),
  password: ApiMaker('user/update/password'),
  vote: ApiMaker('vote/list'),
  detail: ApiMaker('vote/detail'),
  submit: ApiMaker('vote/part'),
  logout: userApiMaker('logout'),
  me: userApiMaker('me'),
  del: userApiMaker('del'),
  info: ApiMaker('user/info'),
  forget: userApiMaker('forget'),
  name: userApiMaker('nickname'),
  test: userApiMaker('test')
}
