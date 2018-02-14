const Koa = require('koa')
const app = new Koa()
const PORT = 3000
const IP = '0.0.0.0'
const baseConfig = require('./middleware/base')
const middleware = require('./middleware/index')
const routes = require('./routes')
baseConfig(app)
app.use(middleware()) // 用户自己写的中间件

routes.map(e => app.use(e.routes()))
app.listen(PORT, IP, (err) => {
  if (err) throw err
  console.log(`> Ready on http://${IP}:${PORT}`)
})
