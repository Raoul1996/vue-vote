const {query} = require('./common')
// 登录
let login = function ({email, pwd}) {
  let _sql = `SELECT id,email,name,mobile FROM users WHERE email="${email}" AND pwd="${pwd}"`
  return query(_sql, {email, pwd})
}
// 获取用户列表
let selectUserProfile = function (id) {
  let _sql = `SELECT id,email,name,mobile,avatar FROM users WHERE id="${id}"`
  return query(_sql, id)
}
// 使用手机号查询用户信息
let selectSalt = function (email) {
  let _sql = `SELECT salt FROM users WHERE email="${email}"`
  return query(_sql, email)
}
let selectUser = function (name, email, mobile) {
  let _sql = `SELECT name FROM users WHERE name="${name}" OR email="${email}" OR mobile="${mobile}"`
  return query(_sql, {name, email, mobile})
}
let selectId = function (email) {
  let _sql = `SELECT * FROM users WHERE id="${email}"`
  return query(_sql, email)
}
// 注册用户
let insertUsers = function (value) {
  let _sql = `INSERT INTO users SET ?`
  return query(_sql, value)
}
let updateToken = function (value) {
  const {token, ip, client} = value
  let _sql = `INSERT INTO tokens SET ? ON DUPLICATE KEY UPDATE 
  token="${token}",ip="${ip}",client="${client}"`
  return query(_sql, value)
}
let sendMail = function (value) {
  let _sql = ``
  return query(_sql, value)
}
let updateUserAvatar = function ({id, avatar}) {
  let _sql = `UPDATE users SET avatar="${avatar}" WHERE id="${id}"`
  return query(_sql, {id, avatar})
}
module.exports = {
  login,
  selectSalt,
  selectUser,
  selectId,
  selectUserProfile,
  insertUsers,
  updateToken,
  sendMail,
  updateUserAvatar
}
