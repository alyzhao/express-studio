const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useMongoClient: true});
exports.mongoose = mongoose;