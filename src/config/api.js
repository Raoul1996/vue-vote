// const __APIHOST__ = 'http://192.168.1.217:8080/user'
const __APIHOST__ = 'http://localhost:8080/user'
/* 加入了其他的url */
const __APIVOTE__ = 'http://192.168.1.217:8080/vote'

const userApiMaker = (path) => {
  return `${__APIHOST__}/${path}`
}
const voteApiMaker = (path) => {
  return `${__APIVOTE__}/${path}`
}
export default {
  host: userApiMaker(''),
  register: userApiMaker('register'),
  login: userApiMaker('login'),
  me: userApiMaker('me'),
  forget: userApiMaker('forget'),
  name: userApiMaker('nickname'),
  password: userApiMaker('password'),
  test: userApiMaker('test'),
  create: voteApiMaker('create')
}
