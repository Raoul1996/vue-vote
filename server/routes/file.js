const router = require('koa-router')()
const fileController = require('../controller/file')

router
  .get('/avatar', fileController.index)
  .post('/upload', fileController.upload)
module.exports = router
