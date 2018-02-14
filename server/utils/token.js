const Validator = require('koa-bouncer').Validator
module.exports = async (ctx, next) => {
  const token = new Validator({
    ctx,
    key: 'token',
    val: ctx.header.token,
    vals: ctx.vals
  })
  token.required('请登录')
  await next()
}
