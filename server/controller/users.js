'use strict'
const config = require('../config')
const userModel = require('../model/user')
const ERROR = require('../utils/errorMap')
const jsonToken = require('jsonwebtoken')
const {secret, timeOut, getRandomSalt, cryptoPwd, subToken} = require('../utils')
const nodemailer = require('nodemailer')
const ccap = require('ccap')(config.capcha || {
  width: 256,
  height: 40,
  offset: 40,
  quality: 100,
  fontsize: 36
})
// 用来存放验证码对应的文字
let txt = ''

class UsersController {
  /**
   * @api {get} /users/:id User Profile
   * @apiName User Profile
   * @apiDescription 需要添加 Authorization 请求头，格式为 Bearer [token]
   * @apiGroup User
   * @apiParam {Number} Vote id
   */
  static async index(ctx) {
    // ctx.validateQuery('name').required()
    const {params: {id}} = ctx
    const data = await userModel.selectUserProfile(id)
    ctx.body = data[0]
  }

  /**
   * @api {post} /login Login
   * @apiName Login
   * @apiGroup User
   * @apiParam {String} email Users email
   * @apiParam {String} password Users password
   * @apiSuccessExample Success-Response:
   *{"code":0,
   * "data":{
   *   "id":90,
   *   "email":"test@test.com",
   *   "name":"Raoul",
   * "token":"eyJhbGcizM1MTaqMtTREYXhyYE3n3CDPyxCps-6imM09A"
   * }}
   * @apiErrorExample Invalid-Email:
   * {"code":1002,"data":[],"message":"invalid email"}
   * @apiErrorExample Invalid-Password:
   * {"code":1001,"data":[],"message":"invalid password"}
   */
  static async login(ctx) {
    // ctx.validateBody('name').required()
    ctx.validateBody('email').required()
    ctx.validateBody('password').required()
    const {body: {email, password, client, captcha}, ip} = ctx.request
    if (captcha.toLowerCase() !== txt.toLowerCase()) throw ERROR.AUTH.CAPTCHA
    // TODO: 考虑重构
    let salt = ''
    let insertToken = ''
    try {
      [{salt}] = await userModel.selectSalt(email)
      const pwd = cryptoPwd(password, salt)
      const [data] = await userModel.login({email, pwd})
      const token = jsonToken.sign({
        id: data.id,
        data: data.email,
        exp: Math.floor(Date.now() / 1000) + timeOut()
      }, secret)
      insertToken = await userModel.updateToken(
        {user_id: data.id, client, ip, token: subToken(token)})
      ctx.body = Object.assign({}, data, {token})
    } catch (e) {
      if (!salt && insertToken.length > 0) {
        throw ERROR.OAUTH.EMAIL_ERROR
      } else if (salt) {
        throw ERROR.OAUTH.PASSWORD_ERROR
      } else {
        // console.log(e)
        throw ERROR.OAUTH.LOGIN_FAIL
      }
    }
  }

  /**
   * @api {post} /register Register
   * @apiName Register
   * @apiGroup User
   * @apiParam {String} name Users name
   * @apiParam {Number} email Users email
   * @apiParam {String} password Users password
   * @apiParam {String} confirm Confirm password
   * @apiSuccessExample Success-Response:
   *{"code":0,
   * "data":{}}
   * @apiErrorExample User-Exist:
   * {"code":2002,"data":[],"message":"user exist"}
   */
  static async register(ctx) {
    ctx.validateBody('email').required()
    ctx.validateBody('mobile').required()
    ctx.validateBody('name').required()
    ctx.validateBody('password').required()
    ctx.validateBody('checkPassword').required()
    const {body: {name, mobile, email, password, checkPassword}} = ctx.request
    const salt = getRandomSalt()
    const pwd = cryptoPwd(password, salt)
    if (password !== checkPassword) throw ERROR.OAUTH.PASSWORD_UNEXPECTED
    const userInDB = await userModel.selectUser(name, email, mobile)
    if (userInDB && userInDB.length > 0) throw ERROR.USER.EXIST
    const data = await userModel.insertUsers({name, mobile, email, pwd, salt})
    if (data && data.insertId) {
      ctx.body = {
        name, mobile, email,
        id: data.insertId,
        message: "注册成功"
      }
    }
  }

  static async update(cxt) {
    const {url} = cxt.request
    // 这个是一个复用的接口
    const type = url.split('/')[2]
    cxt.body = {type}
  }

  static async forget(cxt) {
    cxt.body = {cxt}
  }

  static async logout(cxt) {
    cxt.body = {cxt}
  }

  static async send(ctx) {
    ctx.validateBody('email').required().isEmail()
    // ctx.validateBody('content').required().isString()
    const {email} = ctx.request.body
    let transporter = nodemailer.createTransport(config.mail)
    let mailOptions = {
      from: '"Raoul" <1259510125@qq.com>', // 发件人
      to: `${email}`, // 收件人
      subject: 'Hello ✔', // 主题
      text: 'Voter 激活邮件', // plain text body
      html: `<h1>尊敬的 ${email} 你好：</h1>
<b>您正在注册 Voter 应用，但是我的邮件服务还没有编写完毕，所以你还不能进行验证。现在你可以直接登录啦。</b>
<b>体验地址：http:votes.raoul1996.cn</b>
<b>后端文档：http:raoul1996.github.io/koa-vote</b>
<b>感谢~</b>
` // html body
      // 下面是发送附件，不需要就注释掉
      // attachments: [{
      //   filename: 'test.md',
      //   path: './test.md'
      // }, {
      //   filename: 'content',
      //   content: '发送内容'
      // }]
    }
    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        throw error
      }
      // const message = await userModel.sendMail()
    })
    ctx.body = {
      email,
      message: '发送成功'
    }
  }

  static async captcha(ctx) {
    const ary = ccap.get()
    txt = ary[0]
    const buf = ary[1]
    ctx.type = 'image/png'
    ctx.body = buf
  }
}

module.exports = UsersController
