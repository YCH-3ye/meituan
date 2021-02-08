const multer = require('koa-multer');
const path = require('path')



let storage = multer.diskStorage({
  destination: path.resolve('public/upload'),
  filename: (ctx, file, cb)=>{
    let fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length-1]);
  }
});
let upload = multer({storage})
module.exports = {upload}