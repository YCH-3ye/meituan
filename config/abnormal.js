const result = require('./resultdata')

let abnormal = async(ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log('捕获到异常')
    const isresult = error instanceof result
    if(isresult) {
      console.log('已知错误')
      ctx.body = {
        msg : error.msg
      }
    } else {
      console.log('未知错误')
      ctx.body = {
        msg: '服务器发生错误'
      }
      ctx.status = 500
    }
  }
}

module.exports = abnormal