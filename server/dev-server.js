require('../build/check-versions')()
const ERR = 401
const NOT_FOUND = 10001
const ERR_OK = 200
let config = require('../config/index')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let opn = require('opn')
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let proxyMiddleware = require('http-proxy-middleware')
let webpackConfig = require('../build/webpack.dev.conf')

// default port where dev server listens for incoming traffic
let port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
let autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
let proxyTable = config.dev.proxyTable

let app = express()
// set jwtTokenSecret
const SECRET_STRING = 'vue-login-demo'
app.set('jwtTokenSecret', SECRET_STRING)
// 解析req.body
let bodyParser = require('body-parser')
let moment = require('moment')
let jwt = require('jwt-simple')
let multer = require('multer')
/* eslint-disable no-unused-vars */
let upload = multer() // 解析 multipart/form-data 类型数据
app.use(bodyParser.json()) // 解析 application/json 类型数据
app.use(bodyParser.urlencoded({extended: true})) // 解析 application/x-www-form-urlencoded 类型数据
// these part is the mongodb
let connectDB = require('./database/connect')
let User = require('./database/models')
connectDB()
// jwtauth middleware, this middleware should be exported, but the jwtTokenSecret will have to set twice.
let jwtauth = function (req, res, next) {
// coding goes here
  let token = (req.body && req.body.token) || (req.query && req.query.token) || req.headers['x-access-token']
  // console.log('in middleware')
  // console.log(token)
  if (token) {
    // console.log('has token')
    try {
      let decoded = jwt.decode(token, 'vue-login-demo')
      // handle token here
      // console.log('decode successful')
      // console.log(decoded)
      if (decoded.exp <= Date.now()) {
        res.end('token has expired', 400)
      }
      // console.log('token is ok')
      // UserModel.findOne({_id: decoded.iss},function (err, user) {
      //   req.user = user
      // })
      // console.log('user is ok')
      next()
    } catch (err) {
      // console.log(' has a err')
      res.status(ERR_OK).json({
        'code': 20001,
        'data': {
          'msg': 'token err'
        }
      })
    }
  } else {
    // console.log(' has a err')
    res.status(ERR_OK).json({
      'code': 20002,
      'data': {
        'msg': 'please upload the token'
      }
    })
    // next()
  }
}

// mock server

let apiRoutes = express.Router()
// get method
apiRoutes.get('/getUser', function (req, res) {
  res.json({
    'code': 0,
    'data': {
      'id': 1
    }
  })
})
// decode token
apiRoutes.all('/password', [jwtauth])
apiRoutes.all('/user', [jwtauth])
// login api
apiRoutes.post('/login', function (req, res) {
  let mobile = req.body.mobile
  let password = req.body.password
  if (mobile && password) {
    User.findOne({mobile: mobile}, (err, user) => {
      if (err) {
        return res.status(ERR).json({
          'code': NOT_FOUND,
          'data': {
            'msg': 'user not found'
          }
        })
      }
      if (!user) {
        return res.status(ERR).json({
          'code': NOT_FOUND,
          'data': {
            'msg': 'incorrect username'
          }
        })
      }
      if (user.password !== password) {
        return res.status(ERR).json({
          'code': NOT_FOUND,
          'data': {
            'msg': 'incorrect password'
          }
        })
      }
      // User has authenticated ok
      let expires = moment().add(7, 'days').valueOf()
      let token = jwt.encode({
        iss: req.body.mobile,
        exp: expires
      }, app.get('jwtTokenSecret'))
      res.status(ERR_OK).json({
        'code': 0,
        'data': {
          'user': {
            'userId': 21,
            'mobile': req.body.mobile
          },
          'token': token
        }
      })
    })
  } else {
    res.status(ERR_OK).json({
      'code': 10001,
      'data': {
        'msg': 'login error,please check your data'
      }
    })
  }
})
apiRoutes.get('/user', function (req, res) {
  User.find({}, (err, user) => {
    if (err) console.log(err)
    res.status(200).json({
      data: user
    })
  })
})
apiRoutes.post('/register', function (req, res) {
  // console.log(req.body)
  let mobile = req.body.mobile
  let password = req.body.password
  if (mobile && password) {
    let users = new User({mobile, password})
    User.findOne({mobile: mobile}, (err, user) => {
      if (err) {
        return res.status(ERR).json({
          'code': NOT_FOUND,
          'data': {
            'msg': 'register err'
          }
        })
      }
      if (user) {
        return res.status(ERR).json({
          'code': 20001,
          'data': {
            'msg': 'user exist'
          }
        })
      } else {
        users.save(function (err) {
          if (err) {
            console.log(`save error,${err}`)
          }
          console.log('save successful')
        })
        res.status(ERR_OK).json({
          'code': 0,
          'data': {
            'msg': 'register successful',
            'mobile': req.body.mobile,
            'password': req.body.password
          }
        })
      }
    })
  } else {
    res.status(ERR_OK).json({
      'code': 10001,
      'data': {
        'msg': 'register error,please check your data'
      }
    })
  }
})
apiRoutes.post('/forget', function (req, res) {
  // console.log(req.body)
  let ok = req.body.mobile && req.body.newpassword
  if (ok) {
    res.status(ERR_OK).json({
      'code': 0,
      'data': {
        'msg': 'reset password successful',
        'mobile': req.body.mobile,
        'newPassword': req.body.newpassword
      }
    })
  } else {
    res.status(ERR_OK).json({
      'code': 10001,
      'data': {
        'msg': 'reset password error,please check your data'
      }
    })
  }
})
apiRoutes.post('/password', function (req, res) {
  // console.log(req.body)
  let ok = req.body.mobile && req.body.oldpassword && req.body.newpassword
  if (ok) {
    res.status(ERR_OK).json({
      'code': 0,
      'data': {
        'msg': 'change password successful',
        'mobile': req.body.mobile,
        'oldPassword': req.body.oldpassword,
        'newPassword': req.body.newpassword
      }
    })
  } else {
    res.status(ERR_OK).json({
      'code': 10001,
      'data': {
        'msg': 'change password error,please check your data'
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
let compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
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
  let options = proxyTable[context]
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
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

let uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
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

let server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
