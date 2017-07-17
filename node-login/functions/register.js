'use strict';

const user = require('../models/user');

exports.registerUser = (name, telephone, password) =>

	new Promise((resolve,reject) => {

		const newUser = new user({
			name: name,
			telephone: telephone,
			password: password,
			created: new Date()
		});

		newUser.save()

		.then(() => resolve({ status: 201, message: 'User Registered Sucessfully !' }))

		.catch(err => {

			if (err.code == 11000) {

				reject({ status: 409, message: err.message});

			} else {

				reject({ status: 500, message: 'Internal Server Error !' });
			}
		});
	});
