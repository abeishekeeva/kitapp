'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost:27017/node-login', {useMongoClient: true});
const JSON = require('circular-json');

const conn = mongoose.connection;
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const user = require('./models/user');
const img = require('./models/user');
const book = require('./models/user');
const multer = require('multer');
const fs = require('fs');

const register = require('./functions/register');
const add = require('./functions/addbook');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');

module.exports = router => {

	router.get('/', (req, res) => res.end('Welcome to Kitapp!'));

	router.post('/authenticate', (req, res) => {

		const credentials = auth(req);

		if (!credentials) {

			res.status(400).json({ message: 'Invalid Request !' });

		} else {

			login.loginUser(credentials.name, credentials.pass)

			.then(result => {

				const token = jwt.sign(result, config.secret, { expiresIn: 1440 });

				res.status(result.status).json({ message: result.message, token: token });

			})

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	})

	router.post('/users', (req, res) => {

		const name = req.body.name;
		const telephone = req.body.telephone;
		const password = req.body.password;

		if (!name || !telephone || !password || !name.trim() || !telephone.trim() || !password.trim()) {

			res.status(400).json({message: 'Invalid Request !'});

		} else {

			register.registerUser(name, telephone, password)

			.then(result => {

				res.setHeader('Location', '/users/'+ telephone);
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }));

	}
});

	router.get('/users/:id', (req,res) => {

		if (checkToken(req)) {

			profile.getProfile(req.params.id)

			.then(result => res.json(result))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.put('/users/:id', (req,res) => {

		if (checkToken(req)) {

			const oldPassword = req.body.password;
			const newPassword = req.body.newPassword;

			if (!oldPassword || !newPassword || !oldPassword.trim() || !newPassword.trim()) {

				res.status(400).json({ message: 'Invalid Request !' });

			} else {

				password.changePassword(req.params.id, oldPassword, newPassword)

				.then(result => res.status(result.status).json({ message: result.message }))

				.catch(err => res.status(err.status).json({ message: err.message }));

			}
		} else {

			res.status(401).json({ message: 'Invalid Token !' });
		}
	});

	router.post('/users/:id/password', (req,res) => {

		const telephone = req.params.id;
		const token = req.body.token;
		const newPassword = req.body.password;

		if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

			password.resetPasswordInit(telephone)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));

		} else {

			password.resetPasswordFinish(telephone, token, newPassword)

			.then(result => res.status(result.status).json({ message: result.message }))

			.catch(err => res.status(err.status).json({ message: err.message }));
		}
	});

	function checkToken(req) {

		const token = req.headers['x-access-token'];

		if (token) {

			try {

  				var decoded = jwt.verify(token, config.secret);

  				return decoded.message === req.params.id;

			} catch(err) {
					return false;
			}

		} else {

			return false;
		}
	}


	router.put('/users/addbook/addimg', function(req, res) {
		img.create(req.body).then(function(img) {
			res.send(img)
		})

		var storage = multer.diskStorage({
		    destination: function (req, file, cb) {
		        cb(null, 'uploads/')
		    },
		    filename: function (req, file, cb) {
		        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
		    }
		});

		var upload = multer({ storage: storage }).single('pic');
			upload(req, res, function(err) {
				if(err) {
					res.json(err.message);
				}
				res.send("Image uploaded")
			});

	});
	router.post('/users/:id/book', function(req, res) {
		var id = new mongoose.Types.ObjectId(req.params.id); //the id of the current user

		book.create(req.body).then(function(book){
			res.send(book)
		});

	})

	router.post('/users/:id/book', function(req, res) {
		var author = req.body.author;
		var title = req.body.title;
		var language = req.body.language;
		var genre = req.body.genre;
		var price  = req.body.price;

	var newBook = new book({
		author: author,
		title: title,
		language: language,
		genre: genre,
		price: price
	});

	newBook.save();
	});
	router.put('/users/:id/addbook', function(req, res) {
				var id = new mongoose.Types.ObjectId(req.params.id); //the id of the current user

					var author = req.body.author;
					var title = req.body.title;
					var language = req.body.language;
					var genre = req.body.genre;
					var price  = req.body.price;

				var newBook = new book({
					author: author,
					title: title,
					language: language,
					genre: genre,
					price: price
				});

				newBook.save();

				user.update({_id: id}, {$push:
							{books: {author: author, title: title, language: language, genre: genre, price: price}}}).then(function(user) {
				res.send(user)
			})

			// 	user.update({_id: id}, {$push:
			// 				{books: newBook._id}}).then(function(user) {
			// 	res.send(user)
			// })
 })

	router.get('/users/:id/allbooks', function(req, res) { //OUTPUT ALL AVAILABLE BOOKS
			 user.find({books: {$elemMatch: {'sold' : false}}}).then(function(books) {
				 res.send(books)
			 })
	})

	router.put('/users/:id/removebooks', function(req, res) {
		var id = new mongoose.Types.ObjectId(req.params.id);

			user.update({_id: id}, {$pull: {books: {$elemMatch: {'sold' : true}}}}).then(function(result, err) {
				if(err) {
					res.send(err.message)
				} else
					res.send(result);
 			})
	})
"www.kitapp.com/users/:id/postabook"
	router.get('/genres/:genre', function(req, res) {
		//return books based on genre
	})

}
