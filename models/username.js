const mongoose = require('mongoose')
const Schema =  mongoose.Schema

// 创建集合，在mongoose中没有表只有集合
const NameSchema = new Schema({
	// 注册对象模型
	name: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	openid: {
		type: String,
		require:true,
	}
})


module.exports = Username = mongoose.model('usernamedata', NameSchema)