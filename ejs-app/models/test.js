const mongoose = require('mongoose');
const testSchema = require('../schemas/test');

const testModel = mongoose.model('test', testSchema, 'test');	// 把testSchema注册到collection test上

module.exports = testModel;