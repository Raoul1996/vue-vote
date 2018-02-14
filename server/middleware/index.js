const errorHandler = require('./error_handler.js')
const successHandler = require('./success_handler.js')
const compose = require('koa-compose')

module.exports = () => {
  return compose([
    errorHandler(),
    successHandler()
  ])
}
