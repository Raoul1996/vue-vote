const router = require('koa-router')()
const excelController = require('../controller/excel')

router
  .get('/preview', excelController.index)
  .post('/uploadxlsx', excelController.upload)
  .post('/analysis', excelController.analysis)
module.exports = router
