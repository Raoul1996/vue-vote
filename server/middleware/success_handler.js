module.exports = () => {
  return async (ctx, next) => {
    await next()
    if (ctx.type === 'application/json' && ctx.status === 200) {
      ctx.body = {
        code: 0,
        data: ctx.body
      }
    }
  }
}
