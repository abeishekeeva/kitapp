'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imgSchema = new Schema({
	img: {data: Buffer, contentType: String},
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login', {useMongoClient: true});
const img = mongoose.model('img', imgSchema);
module.exports = img;
