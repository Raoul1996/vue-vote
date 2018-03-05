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
  info: ApiMaker('user'),
  password: ApiMaker('update/password'),
  captcha: ApiMaker('captcha'),
  logout: ApiMaker('logout'),
  // votes
  vote: ApiMaker('vote/list'),
  detail: ApiMaker('vote/detail'),
  create: ApiMaker('vote/create'),
  submit: ApiMaker('vote/part'),
  statistic: ApiMaker('vote/statistic'),
  ownVote: ApiMaker('vote/own'),
  // mock
  del: ApiMaker('del'),
  name: ApiMaker('nickname'),
  test: ApiMaker('test')
}
