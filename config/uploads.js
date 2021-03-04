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
    // this.pull('SUCCESS', optData, 201)
    console.log('start',this.ctx)
    let upImg = await this.upImgFun()
    console.log('end', this.ctx) 
    console.log('---------',upImg)
    this.pull('SUCCESS', [], 201)
    return
    console.log(upImg)
    this.obj[this.image] = upImg
    try {
      let optData = await this.saveData(this.obj)
      console.log(optData)
    } catch(e) {
      this.pull('上传失败', '', 500)
    }
  }
  // 上传图片到阿里云
  upImgFun() {
    return new Promise((resolve, reject) => {
      uploadImg(this.ctx.req.file.path).then(res => {
        console.log('12',res)
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
    console.log(msg, data, code)
    console.log('==========', this.ctx.body)
    this.ctx.body = {
      msg: msg,
      data: data
    }
    this.ctx.status = code
  }
}
// 更改为你优选
class modify extends uploading {
  constructor(ctx, obj, image, Prefer, ids) {
    super(ctx, obj, image, Prefer)
    this.ids = ids
  }
  // 修改了图片
  async preference() {
    // 等待图片上传到阿里云oss
    let upImg = await this.upImgFun()
    log('商家修改的新图片地址'+ upImg)
    try {
      let toUpdate = await this.toUpdate(upImg)
      this.pull('SUCCESS', [], 201)
    } catch(e) {
      this.pull('修改失败', [], 500)
    }
  }

  // 更新集合里的数据
  toUpdate(upImg) {
    return new Promise((resolve, reject) => {
      this.obj[this.image] = upImg
      this.Prefer.findByIdAndUpdate({_id: this.ids}, this.obj, (err, res) => {
        if(err) {
          reject(err)
          this.pull('修改失败', [], 500)
        }else {
          resolve(res)
          this.pull('SUCCESS', [], 201)
        }
      })
    })
  }
}

module.exports = {
  uploading,
  modify
}