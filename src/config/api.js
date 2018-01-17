import { baseUrl } from './env'

const ApiMaker = (path) => {
  return `${baseUrl}/${path}`
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
  statistic: ApiMaker('votes/statistic'),
  ownVote: ApiMaker('votes/own'),
  // mock
  del: ApiMaker('del'),
  name: ApiMaker('nickname'),
  test: ApiMaker('test')
}
