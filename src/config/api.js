import { developmentUrl, productionUrl } from './index'

const ApiMaker = (path, host = developmentUrl) => {
  const hostname = window.location.hostname.toLowerCase()
  if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '0.0.0.0') {
    host = productionUrl
  }
  return `${host}/${path}`
}
export default {
  host: ApiMaker(''),
  // users
  login: ApiMaker('login'),
  register: ApiMaker('register'),
  forget: ApiMaker('forget'),
  send: ApiMaker('send'),
  info: ApiMaker('users'),
  password: ApiMaker('update/password'),
  captcha: ApiMaker('captcha'),
  logout: ApiMaker('logout'),
  // votes
  vote: ApiMaker('votes/list'),
  detail: ApiMaker('votes/detail'),
  create: ApiMaker('votes/create'),
  submit: ApiMaker('votes/part'),
  del: ApiMaker('del'),
  name: ApiMaker('nickname'),
  test: ApiMaker('test')
}
