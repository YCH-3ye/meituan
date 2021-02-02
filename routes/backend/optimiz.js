const router = require('koa-router')()
// 路由：()直接实例化
const Username = require('../../models/username.js')

//  注册路由
router.post('/register', async ctx => {
	console.log(ctx.request.body)
	let { name, password, openId } = ctx.request.body
	if(name === '' ||  password === '') {
		console.log('不能为空')
		// 响应
		ctx.body = {
			msg: '不能为空'
		}
		ctx.status = 202
		return false
	}
	if(name === undefined ||  password === undefined) {
		console.log('参数填写不正确')
		ctx.status = 400
		// 响应
		ctx.body = {
			msg: '参数填写不正确'
		}

		return false
	}

	// 用户名校验
	let phone = /^1[3456789]\d{9}/
	if(!phone.test(name)) {
		ctx.body = {
			msg: '手机号码不正确'
		}
		ctx.status = 202
		return false
	}
	// 密码验证：
	const user = new Username({
		name,
		password,
		openId
	})
	await user.save()
	.then((res) => {
		console.log('成功')
	}).catch((res) => {
		console.log('失败')
	})
})


module.exports = router.routes()