const Koa = require('Koa')
const app = new Koa()
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')

const mongoose = require('mongoose')
const router = require('koa-router')()

mongoose.set('useFindAndModify', false)
// 引用数据库
const mburl = require('./config/base.js').mburl
console.log(mburl)
// 连接数据库
mongoose.connect(mburl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then((res) => {
	console.log('数据库链接成功')
}).catch((err) => {
	console.log(err)
	console.log('数据库链接失败')
})
// 


app.use(json())
app.use(bodyParser())




// 启动路由
app.use(router.routes())
app.use(router.allowedMethods())



//引入optimiz文件里的路由
const banner = require('./routes/backend/optimiz.js')

// 注册路由中间件

router.use('/api', banner)









app.listen(3000);
console.log('启动美团')

