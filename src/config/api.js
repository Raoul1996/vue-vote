// const __APIHOST__ = 'http://192.168.1.217:8080/user'
// const __APIHOST__ = 'http://localhost:8081/user'
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
  logout: userApiMaker('logout'),
  me: userApiMaker('me'),
  del: userApiMaker('del'),
  getUser: userApiMaker('user'),
  forget: userApiMaker('forget'),
  name: userApiMaker('nickname'),
  test: userApiMaker('test')
}
