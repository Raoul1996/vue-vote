const convert = require('koa-convert')
const path = require('path')
const cors = require('koa2-cors')
const Serve = require('koa-static')
const views = require('koa-views')
const logger = require('koa-logger')
const mount = require('koa-mount')
const parameter = require('koa-parameter')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const bouncer = require('koa-bouncer')
const restc = require('restc')
const fundebug = require("fundebug-nodejs")
fundebug.apikey = "c6b78622dab997807da49c335865875786f07a9917e086e20d24ba1800554b33"
const {secret} = require('../utils/jwt')
module.exports = (app) => {
  app.use(convert(logger()))
  app.use(cors({
    origin: function (ctx) {
      if (ctx.url === '/test') {
        return false
      }
      return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }))
  app.use(function (ctx, next) {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = 'Protected resource, use Authorization header to get access\n'
      } else {
        throw err
      }
    })
  })

  app.use(jwt({secret})
    .unless({
      path: [/\/register/,
        /\/favicon.ico/,
        /\/login/,
        /\/forget/,
        /\/captcha/,
        /\/file/,
        /\/analysis/
      ]
    }))
  app.use(bodyParser())
  app.use(convert(parameter(app)))
  app.use(bouncer.middleware())
  app.use(mount("/", convert(Serve(__dirname + '/../public/'))))
  app.use(views(path.join(__dirname, '/../views'), {
    extensions: 'pug'
  }))
  app.use(restc.koa2())
  app.on('error', fundebug.KoaErrorHandler)
}

