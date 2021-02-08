const router = require('koa-router')()
// 路由：()直接实例化
const Username = require('../../models/username.js')

// 为你优选
const Prefer = require('../../models/preferen')

// 上传图片
const {upload} = require('../../oss/oss')

const initData = require('../../config/init')

//  注册路由
router.post('/register', async ctx => {
	console.log(ctx.request.body)
	let { name, password, openId } = ctx.request.body
	if(name === '' ||  password === '') {
		const init = new initData(ctx)
		init.tips('不能为空', 202)
		return false
	}
	if(name === undefined ||  password === undefined) {
		const init = new initData(ctx)
		init.tips('参数填写不正确', 202)
		return false
	}

	// 用户名校验
	let phone = /^1[3456789]\d{9}/
	if(!phone.test(name)) {
		const init = new initData(ctx)
		init.tips('手机号码不正确', 202)
		return false
	}
	// 密码验证
	let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
	if(!reg.test(password)) {
		const init = new initData(ctx)
		init.tips('密码格式不对', 202)
		return false
	}

	const user = new Username({
		name,
		password,
		openId
	})
	await user.save()
	.then((res) => {
		const init = new initData(ctx)
		init.listing('成功')
	}).catch((res) => {
		const init = new initData(ctx)
		init.tips('失败', 500)
	})
})

// 登录接口
router.post('/login', async (ctx) => {
	console.log(ctx.request.body)
	let { name, password } = ctx.request.body
	const init = new initData(ctx)
	if(name === '' || password === '') {
		init.tips('帐号密码不能为空', 202)
		return false
	}
	if(name === undefined || password === undefined) {
		init.tips('参数填写不正确', 202)
		return false
	}
	await Username.find({
		name,
		password,
	})
	.then((res) => {
		console.log(res)
		init.listing('成功')
	}).catch((res) => {
		console.log(res)
		init.tips('失败', 500)
	})
})

router.post('/prefer', upload.single('file'), async ctx => {
	console.log('111')
})

module.exports = router.routes()