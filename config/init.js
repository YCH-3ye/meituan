// 处理响应
class initData{
  constructor(ctx, msg='SUCCESS', data=[], code=200) {
    this.ctx = ctx
    this.msg = msg
    this.data = data
    this.code = code
  }
  // 200的正确返回
  listing() {
    this.ctx.body = {
      msg: this.msg,
      data: this.data
    }
    this.ctx.status = this.code
  }

  // 参数不对的响应
  tips(msg, code) {
    this.ctx.body = {
      msg: msg
    }
    this.ctx.status = code
  }
}

module.exports = initData