'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const img = require('./img');

const bookSchema = new Schema({
	author: String,
	title: String,
	language: String,
	genre: String,
	price: String,
	sold: {type:Boolean, default: false},
  imgId:{type: mongoose.Schema.Types.ObjectId, ref: 'img'}
})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login', {useMongoClient: true});
const book = mongoose.model('book', bookSchema);
module.exports = book;
