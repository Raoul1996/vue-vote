const {timeOut, secret} = require('./jwt')
const {getRandomSalt, cryptoPwd} = require('./pass')

const getNowDate = () => {
  const date = new Date()
  return date.getTime()
}
const subToken = (token, start = 0, len = 40) => {
  return token.split('').reverse().slice(start, len).reverse().join('')
}
module.exports = {
  timeOut,
  secret,
  getRandomSalt,
  cryptoPwd,
  subToken,
  getNowDate
}
