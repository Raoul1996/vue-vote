// API HOST 是本地的 mock server
const __KOAHOST__ = 'http://api.raoul1996.cn'
const __HOST__ = 'http://vote.helloyz.cn'

const KoaApiMaker = (path) => {
  return `${__KOAHOST__}/${path}`
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
  logout: KoaApiMaker('logout'),
  me: KoaApiMaker('me'),
  del: KoaApiMaker('del'),
  info: KoaApiMaker('users'),
  forget: KoaApiMaker('forget'),
  name: KoaApiMaker('nickname'),
  test: KoaApiMaker('test')
}
