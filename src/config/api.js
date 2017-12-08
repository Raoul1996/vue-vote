// API HOST 是本地的 mock server
const __APIHOST__ = 'http://localhost:3000'
const __KOAHOST__ = 'http://api.raoul1996.cn'
const __HOST__ = 'http://vote.helloyz.cn'

const KoaApiMaker = (path) => {
  return `${__KOAHOST__}/${path}`
}
const userApiMaker = (path) => {
  return `${__APIHOST__}/${path}`
}
const ApiMaker = (path) => {
  return `${__HOST__}/${path}`
}
export default {
  host: KoaApiMaker(''),
  login: KoaApiMaker('login'),
  register: KoaApiMaker('register'),
  password: ApiMaker('user/update/password'),
  vote: ApiMaker('vote/list'),
  detail: ApiMaker('vote/detail'),
  create: ApiMaker('vote/create'),
  submit: ApiMaker('vote/part'),
  logout: userApiMaker('logout'),
  me: userApiMaker('me'),
  del: userApiMaker('del'),
  info: ApiMaker('user/info'),
  forget: userApiMaker('forget'),
  name: userApiMaker('nickname'),
  test: userApiMaker('test')
}
