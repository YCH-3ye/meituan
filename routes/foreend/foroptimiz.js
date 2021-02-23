// 路由: 获取为你优选
const router = require('koa-router')()

// 响应接收
const initdata = require('../../config/init')

// 为你优选 模型
const Prefer = require('../../models/preferen')

router.get('/getPrefer', async ctx => {
  let listData = await Prefer.find()
  if(listData.length === 0) {
    new initdata(ctx, '没有数据', listData, 200).listing()
  } else {
    new initdata(ctx, 'SUCCESS', listData, 200).listing()
  }
})

module.exports = router.routes()