const { uploadImg } = require('../oss/oss')
// 上传图片和其他类型的数据到数据库
class uploading {
  constructor(ctx, obj, image, model) {
    this.ctx = ctx
    this.obj = obj 
    this.image = image
    // 操作那个对象模型
    this.model = model
  }
  async resultData() {
    console.log(1123)
    let upImg = await this.upImgFun()
    console.log(111)
    console.log(upImg)
  }
  // 上传图片到阿里云
  upImgFun() {
    return new Promise((resolve, reject) => {
      uploadImg(this.ctx.req.file.path).then(res => {
        resolve(res.url)
      }).catch(err => {
        console.log(err)
      })
    })
  }
}

module.exports = {
  uploading
}