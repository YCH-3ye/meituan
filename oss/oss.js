const multer = require('koa-multer');
const path = require('path')
let OSS = require('ali-oss');

let client = new OSS({
  region: 'oss-cn-shanghai',
  bucket: 'shye-oss',
  accessKeyId: 'LTAI4GKZpYMedrvySd95ZB3U',
  accessKeySecret: 'kKNn8KiI9pJYj362GXIxtEerO1H3TY'
});




let storage = multer.diskStorage({
  destination: path.resolve('public/upload'),
  filename: (ctx, file, cb)=>{
    let fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length-1]);
  }
});
let upload = multer({storage})

// 上传图片到oss
let uploadImg = function(image) {
  return new Promise((resolve, rejects) => {
    client.put('meituan/' + image, image)
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      console.log(err)
    })
  })
}
module.exports = {upload, uploadImg}