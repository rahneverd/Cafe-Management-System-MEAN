const User = require('../models/User');

exports.register = function (req, res) {
	let user = new User(req.body);
	res.send(user);
};
exports.login = function (req, res) {
	res.send('login');
};
exports.logout = function (req, res) {};
exports.home = function (req, res) {};
