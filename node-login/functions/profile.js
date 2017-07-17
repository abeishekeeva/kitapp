'use strict';

const user = require('../models/user');

exports.getProfile = telephone =>

	new Promise((resolve,reject) => {

		user.find({ telephone: telephone }, { name: 1, telephone: 1, created: 1, _id: 0 })

		.then(users => resolve(users[0]))

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))

	});
