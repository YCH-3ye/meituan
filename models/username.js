const mongoose = require('mongoose')
const Schema =  mongoose.Schema

// Schema里面拥有的类型
// String
// Number
// Data
// Buffer: 存储二进制数据
// Boolean
// ObjectId: {_id: '唯一的id'}
// Array: 混合型数组
// Mixed：可以指定任意类型：[]{}''


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
	openId: {
		type: String,
		require:true,
	}
})


module.exports = Username = mongoose.model('usernamedata', NameSchema)