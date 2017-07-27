'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const book = require('./book');


const userSchema = new Schema ({
	name 			: String,
	telephone	: {type: String, unique: false},
	password	: String,
	created: String,
	bookId: [{type: mongoose.Schema.Types.ObjectId, ref: 'book'}]
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-login', {useMongoClient: true});
const user = mongoose.model('user', userSchema);
module.exports = user;
