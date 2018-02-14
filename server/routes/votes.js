const router = require('koa-router')()
const VotesController = require('../controller/votes')

router.prefix('/votes')
  .post('/create', VotesController.create)
  .get('/delete/:id', VotesController.delete)
  .post('/part/:id', VotesController.part)
  .get('/list', VotesController.list)
  .get('/detail/:id', VotesController.detail)
  .get('/statistic/:id', VotesController.statistic)
  .get('/own/:id', VotesController.own)
module.exports = router
