'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imgSchema = new Schema({
	img: {data: Buffer, contentType: String},

})

const bookSchema = new Schema({
	author: String,
	title: String,
	language: String,
	genre: String,
	price: String,
	sold: {type:Boolean, default: false}
})

const userSchema = new Schema ({
	name 			: String,
	telephone	: {type: String, unique: false, required: true},
	password	: String,
	created: String,
	books: [bookSchema]
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login', {useMongoClient: true});
const user = mongoose.model('user', userSchema);
const img = mongoose.model('img', imgSchema);
const book = mongoose.model('book', bookSchema);
module.exports = user, img, book;
