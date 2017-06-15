require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
// 解析req.body
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer() // 解析 multipart/form-data 类型数据
app.use(bodyParser.json()) // 解析 application/json 类型数据
app.use(bodyParser.urlencoded({extended: true})) // 解析 application/x-www-form-urlencoded 类型数据

// mock server

var apiRoutes = express.Router()
// get method
apiRoutes.get('/getUser', function (req, res) {
  res.json({
    'code': 0,
    'data': {
      'id': 1
    }
  })
})
// login api
apiRoutes.post('/login', function (req, res) {
  res.status(200).json(
    {
      'code': 0,
      'data': {
        'user': {
          'userId': 21,
          'mobile': '17732900750',
          'sex': 'female'
        },
        'token': '9b6020276b244645a9a0adb130a694fd'
      }
    }
  )

})
apiRoutes.post('/register', function (req, res) {
  console.log(req.body)
  let ok = req.body.mobile && req.body.password
  if (ok) {
    res.status(200).json({
      'code': 0,
      'data': {
        'msg': 'login successful',
        'mobile': req.body.mobile || '15033332222',
        'password': req.body.password || '123456'
      }
    })
  } else {
    res.status(200).json({
      'code': 10001,
      'data': {
        'msg': 'login error,please check your data'
      }
    })
  }
})
// 500 middleware
apiRoutes.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({
    'code': 500
  })
})
// 404 middleware
apiRoutes.use(function (req, res) {
  res.status(404).json(
    {'code': 404}
  )
})
app.use('/user', apiRoutes)
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
