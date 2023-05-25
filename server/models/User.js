const usersCollection = require('../db').collection('users');
const ObjectID = require('mongodb').ObjectId;
const validator = require('validator');

let User = function (data) {
	this.data = data;
	this.errors = [];
};

User.prototype.cleanUpForLogin = function () {
	if (validator.isEmail(this.data.username)) {
		this.data.username = 'anyone';
	} else if (!validator.isEmail(this.data.email)) {
		this.data.email = 'anyone@anywhere.any';
	}
};

User.prototype.cleanUp = function () {
	if (typeof this.data.username != 'string') {
		this.data.name = '';
	}
	if (typeof this.data.password != 'string') {
		this.data.category = '';
	}
	if (typeof this.data.email != 'string') {
		this.data.price = '';
	}
	this.data = {
		username: this.data.username.trim().toLowerCase(),
		email: this.data.email.trim().toLowerCase(),
		password: this.data.password,
	};
};

User.prototype.validate = function () {
	if (
		this.data.username === undefined ||
		this.data.username === '' ||
		!validator.isAlphanumeric(this.data.username)
	) {
		this.errors.push({
			property: 'username',
			value: this.data.username,
			message: 'Provide a valid username.',
		});
	}
	if (
		this.data.password === undefined ||
		this.data.password === '' ||
		!validator.isAlphanumeric(this.data.password)
	) {
		this.errors.push({
			property: 'password',
			value: this.data.password,
			message: 'Provide a valid password.',
		});
	}
	if (
		this.data.email === undefined ||
		this.data.email === '' ||
		!validator.isEmail(this.data.email)
	) {
		this.errors.push({
			property: 'email',
			value: this.data.email,
			message: 'Provide a valid email.',
		});
	}
};

User.prototype.validateFromDB = function () {
	return new Promise((resolve, reject) => {
		if (this.errors.length === 0) {
			usersCollection
				.findOne({ username: this.data.username })
				.then((user1) => {
					if (user1 === null) {
						usersCollection
							.findOne({ email: this.data.email })
							.then((user2) => {
								if (user2 === null) {
									resolve();
								} else {
									this.errors.push({
										property: 'email',
										value: this.data.email,
										message: 'This email is already taken.',
									});
									reject();
								}
							})
							.catch((error) => {
								this.errors.push(err.message);
								reject();
							});
					} else {
						this.errors.push({
							property: 'username',
							value: this.data.username,
							message: 'This username is already taken.',
						});
						reject();
					}
				})
				.catch((error) => {
					this.errors.push(err.message);
					reject();
				});
		} else {
			reject();
		}
	});
};

User.prototype.register = function () {
	return new Promise((resolve, reject) => {
		// Step 1 - Validate User
		this.cleanUp();
		this.validate();
		this.validateFromDB()
			.then(() => {
				// do stuff here
				usersCollection
					.insertOne(this.data)
					.then((response) => {
						resolve({ ...response, ...this.data });
					})
					.catch((error) => {
						this.errors.push(error.message);
						reject();
					});
			})
			.catch((error) => {
				console.log(error);
				reject();
			});

		// Step 2 - Only if there are no validation errors
		// Step 3 -Save the use into database
	});
};

User.prototype.login = function () {
	return new Promise((resolve, reject) => {
		this.cleanUpForLogin();
		this.cleanUp();
		this.validate();
		if (this.errors.length > 0) {
			reject();
		} else {
			usersCollection
				.findOne({
					$or: [{ email: this.data.email }, { name: this.data.name }],
				})
				.then((user) => {
					if (user.password === this.data.password) {
						resolve('logged in succesfully');
					} else {
						this.errors.push({
							property: 'password',
							message: 'Password does not match',
							value: this.data.password,
						});
						reject();
					}
				})
				.catch((error) => {
					this.errors.push(error.message);
					reject();
				});
		}
	});
};

module.exports = User;
