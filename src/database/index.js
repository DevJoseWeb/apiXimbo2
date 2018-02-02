const mongoose = require('mongoose');
//mongodb://ximbo:ximbo@ds217898.mlab.com:17898/ximbo
//mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
mongoose.connect('mongodb://ximbo:ximbo@ds217898.mlab.com:17898/ximbo', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
