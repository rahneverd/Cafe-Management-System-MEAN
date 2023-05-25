const User = require('../models/User');

exports.register = function (req, res) {
	let user = new User(req.body.user);
	user
		.register()
		.then((response) => {
			res.send(response);
		})
		.catch((errors) => {
			console.log(errors);
			res.send(user.errors);
		});
};
exports.login = function (req, res) {
	let user = new User(req.body.user);
	user
		.login()
		.then((response) => {
			res.send(response);
		})
		.catch((errors) => {
			console.log(errors);
			res.send(user.errors);
		});
};
exports.logout = function (req, res) {};
exports.home = function (req, res) {};
