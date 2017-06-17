/**
 * this file is a connect config file
 * @type {*}
 */
let mongoose = require('mongoose')
// config your remote database before you connect you DB
module.exports = function (link) {
  let links = link || 'mongodb://123.207.252.230:12345/test'
  if (!link) {
    console.log('you use the default database on raoul server')
  }
  let db = mongoose.connect(links)
  db.connection.on('error', (error) => {
    console.log(`connect database filed:${error}`)
  })
  db.connection.on('open', () => {
    console.log('connect database successfully')
  })
}
