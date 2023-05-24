const Product = require('../models/Product');

exports.create = function (req, res) {
	let product = new Product(req.body);
	product
		.create()
		.then(() => {
			res.send(req.body);
			// console.log('resolved');
		})
		.catch((errors) => {
			res.send(errors);
			// console.log(errors);
		});
};
