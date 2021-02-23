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
    let upImg = await this.upImgFun()
    console.log(upImg)
    this.obj[this.image] = upImg
    try {
      let optData = await this.saveData(this.obj)
      console.log(optData)
      this.pull('SUCCESS', optData, 201)
    } catch(e) {
      this.pull('上传失败', '', 500)
    }
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
  // 上传到数据库
  saveData(obj) {
    return new Promise((resolve, reject) => {
      const model = new this.model(obj)
      model.save()
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  // 响应
  pull(msg, data, code) {
    this.ctx.body = {
      msg: msg,
      data: data
    }
    this.ctx.status = code
  }
}

module.exports = {
  uploading
}