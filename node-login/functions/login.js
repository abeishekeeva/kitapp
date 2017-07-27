'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loginUser = (telephone, password) =>

	new Promise((resolve,reject) => {

		user.find({telephone: telephone})

		.then(users => {

			if (users.length == 0) {

				reject({ status: 404, message: 'User Not Found !' });

			} else {

				return users[0];

			}
		})

		.then(user => {

			const userPassword = user.password;
			//const hashed_password = user.hashed_password;

			//if (bcrypt.compareSync(password, hashed_passwor)) {
			if (password === userPassword) {
				resolve({ status: 200, message: telephone});

			} else {

				reject({ status: 401, message: 'Invalid Credentials !' });
			}
		})

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

	});
