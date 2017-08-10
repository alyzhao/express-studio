const mongoose = require('mongoose');

let testSchema = mongoose.Schema({
	title: String,
	author: String,
	comments: [{body: String, date: Date}],
	date: { type: Date, default: Date.now },
    meta: {
        votes: Number,
        favs: Number
    }
});

// 定义一个方法, methods只有document可以调用
testSchema.methods.findAuthor = function(cb) {
	return this.model('test').find({author: this.author}, cb);
}

// 虚拟属性
testSchema.virtual('num').get(function() {
	return this.meta.votes + ' vote it, and ' + this.meta.favs + " like it."
})




// 定义静态方法
// testSchema.statics = {
// 	findById: function(id, cb) {
// 		return this.findOne({_id: id}, cb);
// 	}
// }

module.exports = testSchema;
