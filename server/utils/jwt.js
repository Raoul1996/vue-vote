const fs = require('fs')
let timeOut = function (hours = 1) {
  return hours * 3600
}
const secret =  fs.readFileSync(__dirname + '/../id_rsa.enc')
module.exports = {
  secret: secret,
  timeOut
}
