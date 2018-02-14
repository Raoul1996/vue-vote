const {query} = require('./common')
let selectUserId = function (token) {
  let _sql = `SELECT user_id from tokens WHERE token="${token}"`
  return query(_sql, token)
}
module.exports = {
  selectUserId
}
