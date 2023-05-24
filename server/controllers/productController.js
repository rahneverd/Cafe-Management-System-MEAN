const Product = require('../models/Product');

exports.create = function (req, res) {
	let product = new Product(req.body.product);
	product
		.create()
		.then((response) => {
			res.send({ ...response, ...product.data, id: response.insertedId });
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
exports.delete = function (req, res) {
	let product = new Product(req.body.product);
	product
		.delete(req.body.id)
		.then((response) => {
			res.send(response);
		})
		.catch(() => {
			res.send(product.errors);
		});
};
exports.readById = function (req, res) {
	let product = new Product(req.body.product);
	product
		.readById(req.body.id)
		.then((response) => {
			res.send(response);
		})
		.catch(() => {
			res.send(product.errors);
		});
};
exports.readByCategory = function (req, res) {
	let product = new Product(req.body.product);
	product
		.readByCategory()
		.then((response) => {
			res.send(response);
		})
		.catch((errors) => {
			console.log(errors);
			res.send(product.errors);
		});
};
