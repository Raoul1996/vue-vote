// API HOST 是本地的 mock server
const __APIHOST__ = 'http://localhost:3000'

const ApiMaker = (path) => {
  return `${__APIHOST__}/${path}`
}
export default {
  host: ApiMaker(''),
  login: ApiMaker('login'),
  register: ApiMaker('register'),
  info: ApiMaker('users'),
  password: ApiMaker('update/password'),
  vote: ApiMaker('votes/list'),
  detail: ApiMaker('votes/detail'),
  create: ApiMaker('votes/create'),
  submit: ApiMaker('votes/part'),
  logout: ApiMaker('logout'),
  me: ApiMaker('me'),
  del: ApiMaker('del'),
  forget: ApiMaker('forget'),
  name: ApiMaker('nickname'),
  test: ApiMaker('test')
}
