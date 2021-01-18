const Koa = require('Koa')
const app = new Koa()
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')

const router = require('koa-router')()


app.use(json())
app.use(bodyParser())




// 启动路由
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000);
console.log('启动美团')

