module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      // 自定义错误时异常返回的格式
      ctx.body = {
        code: err.code,
        data: [],
        message: err.message
      }
    }
  }
}
