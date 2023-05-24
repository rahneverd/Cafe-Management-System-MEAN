const Product = require('../models/Product');

exports.create = function (req, res) {
	let product = new Product(req.body.product);
	product
		.create()
		.then((response) => {
			res.send(response);
		})
		.catch(() => {
			res.send(product.errors);
		});
};

exports.read = function (req, res) {
	let product = new Product(req.body.product);
	product
		.read()
		.then((data) => {
			res.send(data);
		})
		.catch(() => {
			res.send(product.errors);
		});
};
exports.update = function (req, res) {
	let product = new Product(req.body.product);
	product
		.update(req.body.id)
		.then((response) => {
			res.send(response);
		})
		.catch(() => {
			res.send(product.errors);
		});
};
exports.delete = function (req, res) {};
