const router = require('koa-router')()
const Username = require('../../models/username.js')

//  注册路由
router.post('/register', async ctx => {
	console.log('这是注册')
})


module.exports = router.routes()