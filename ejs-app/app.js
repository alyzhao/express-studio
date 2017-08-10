var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useMongoClient: true});
mongoose.Promise = global.Promise;
let testModel = require('./models/test');

// 这个创建的是一个Entity
let testDocument = new testModel({
	title: '老人与海',
	author: 'captainZhao',
	comments: [{body: 'a good book', date: Date()}],
	date: { type: Date, default: Date.now },
    meta: {
        votes: 8,
        favs: 6
    }
});

// console.log('test virtual: ' + testDocument.num);
let _id = '598c14505ea4a23750ccb05c';
/*** 修改 ***/
// 更新1
/*testModel.findById('598bfbe7840a3d344c2d09d6', (err, result) => {
	result.title = '修改测试';
	result.save(err => {
		if (err) console.log(err);
	})
})*/
// 更新2
/*testModel.findById('598bfbe7840a3d344c2d09d6', (err, result) => {
	console.log(result);
	result.title = '修改测试2';
	let _id = result._id;
	delete result._id;
	testModel.update({_id: _id}, result, err => {});
})*/
// 更新3
/*testModel.update({_id: _id}, {$set: {title: 'set修改测试', meta: {votes: 5, favs: 5}}}, function(err, num) {
	if (err) {
		console.log(err)
	} else {
		console.log(num + ' records has been modified');
	}
})*/ 
// 更新4返回修改的对象, 返回的是修改前的对象
/*testModel.findByIdAndUpdate(_id, {$set: {title: '返回对象测试'}}, function(err, result) {
	console.log(result);
});*/

/**** 新增 ****/
// 1. 使用Entity新增
/*let newDocument = new testModel({
	title: '弗洛伊德梦的解析',
	author: '弗洛伊德',
	comments: [{body: 'a good book about psychology', date: Date()}],
	// date: { type: Date, default: Date.now },
    meta: {
        votes: 8,
        favs: 6
    }
});
newDocument.save(function(err, document) {
	if (err) {
		console.log(err);
	} else {
		console.log(document);
	}
});*/
// 2. 使用model新增
/*let newDocument = new testModel({
	title: 'javascript语言精粹',
	author: 'Douglas Crockford',
	comments: [{body: 'a good book about javascript', date: Date()}],
	// date: { type: Date, default: Date.now },
    meta: {
        votes: 8,
        favs: 6
    }
});
testModel.create(newDocument, (err, document) => {
	if (err) return console.error(err);
	console.log(document);
})*/

/*** 删除 ***/
//1. model删除
/*testModel.remove({title: '老人与海'}, (err, doc) => {
	if (err) return console.error(err);
	console.log(doc);
})*/

/*testModel.findOneAndRemove({title: '返回对象测试'}, (err, result) => {
	if (err) return console.error(err);
	console.log(result);	
})*/

//2. Entity删除, 官网上没有出现Entity, 只有document
testModel.findById(_id, (err, result) => {
	console.log(result)
	if (err) return console.error(err);
	result.remove((err, res) => {
		console.log(err);
		console.log(res);
	})
})

// testModel.findById('598bfbe7840a3d344c2d09d6', function(err, result) {
// 	result.title = '深夜食堂';
// 	let _id = result._id;
// 	delete result._id;
// 	testModel.update({_id: _id}, result, err => {});
// })

// testDocument.findAuthor(function(err, results) {
// 	console.log(results);
// })


// testDocument.save(function(err, result) {
// 	if (err) return console.error(err);
// 	console.log('add new record success');
// })


var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/', routes);
app.use('/test', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
