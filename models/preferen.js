const mongoose = require('mongoose')
const Schema =  mongoose.Schema


// 创建集合，在mongoose中没有表只有集合
const preferSchema = new Schema({
		// 注册对象模型
		image: {
			type: String,
			require: true,
		},
		title: {
			type: String,
			require: true,
		},
		lable: {
			type: String,
			require:true,
		},
	},
	{
		versionKey: false
	}
)


module.exports = prefer = mongoose.model('preferData', preferSchema)