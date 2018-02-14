const indexRouter = require('koa-router')()
const indexController = require('../controller/index')

const users = require('./users')
const votes = require('./votes')
const file = require('./file')
const excel = require('./excel')
indexRouter.get('/', indexController.index)

module.exports = [
  indexRouter,
  users,
  votes,
  file,
  excel
]
