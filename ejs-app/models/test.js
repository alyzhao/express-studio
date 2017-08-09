const mongodb = require('./mongodb');
const Schema = mongodb.mongoose.Schema;

let testSchema = new Schema({
	title: String,
	author: String,
	comments: [{body: String, date: Date}],
	date: { type: Date, default: Date.now },
    meta: {
        votes: Number,
        favs: Number
    }
});

let Test = mongodb.mongoose.model('test1', testSchema);
let TestDAO = function() {};
module.exports = new TestDAO();

