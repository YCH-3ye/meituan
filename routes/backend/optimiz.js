const router = require('koa-router')()
// 路由：()直接实例化
const Username = require('../../models/username.js')

// 为你优选
const Prefer = require('../../models/preferen')

// 上传图片
const { upload } = require('../../oss/oss')

const { uploading } = require('../../config/uploads')

const initData = require('../../config/init')
function isEmpty(str) {
	str = str.replace(/ /g, '')
	return str.length
}

//  注册路由
router.post('/register', async ctx => {
	console.log(ctx.request.body)
	let { name, password, openId } = ctx.request.body
	if(name === '' ||  password === '') {
		const init = new initData(ctx)
		init.tips('不能为空', 202)
		return false
	}
	if(name === undefined || isEmpty(name) ||  password === undefined || isEmpty(password)) {
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
	user.save()
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
	if(name === undefined || isEmpty(name) || password === undefined || isEmpty(password) ) {
		init.tips('参数填写不正确', 202)
		return false
	}
	const listData = await Username.find({
		name,
		password,
	})
	console.log(listData)
	if(listData.length === 0){
		new initData(ctx).tips('账号或密码错误',202)
	}else{
		new initData(ctx,'SUCCESS', listData[0].openId, 200).listing()
	}
})

router.post('/prefer', upload.single('file'), async ctx => {
	console.log('为你优选')
	console.log(ctx.req.file)
	let { title, lable } = ctx.req.body
	console.log(title)
	console.log(lable)
	if(title === '' || isEmpty(title) || lable === '' || isEmpty(lable)) {
		new initData(ctx).tips('商品参数为空',202)
		return
	}
	if(ctx.req.file === undefined) {
		new initData(ctx).tips('请上传图片',202)
		return
	}
	let obj = {
		title,
		lable
	}
	new uploading(ctx, obj, 'image', Prefer).resultData()
})

module.exports = router.routes()