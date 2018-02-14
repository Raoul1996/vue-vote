const router = require('koa-router')()
const UsersController = require('../controller/users')
// const token = require('../utils/token')

router
  .get('/users/:id', UsersController.index)
  .get('/logout', UsersController.logout)
  .get('/captcha', UsersController.captcha)
  .post('/login', UsersController.login)
  .post('/register', UsersController.register)
  .post('/forget', UsersController.forget)
  .post('/send', UsersController.send)
  .post('/update/:type', UsersController.update)
// .get('*',UsersController.notFound)

module.exports = router
