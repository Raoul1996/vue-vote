const ApiMaker = (path, host = 'http://localhost:3000') => {
  const hostname = window.location.hostname.toLowerCase()
  if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '0.0.0.0') {
    host = `http://api.raoul1996.cn`
  }
  return `${host}/${path}`
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
  send: ApiMaker('send'),
  logout: ApiMaker('logout'),
  me: ApiMaker('me'),
  del: ApiMaker('del'),
  forget: ApiMaker('forget'),
  name: ApiMaker('nickname'),
  test: ApiMaker('test')
}
