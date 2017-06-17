let mongoose = require('mongoose')
let Schema = mongoose.Schema
let UserSchma = new Schema({
  mobile: String,
  password: String
  // token: String
})
module.exports = mongoose.model('User', UserSchma)
