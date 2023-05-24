const productsCollection = require('../db').collection('products');
const validator = require('validator');

let Product = function (data) {
	this.data = data;
	this.errors = [];
	console.log(data);
};

Product.prototype.cleanUp = function () {
	console.log('inside cleanup');
	if (typeof this.data.name != 'string') {
		this.data.name = '';
	}
	if (typeof this.data.category != 'string') {
		this.data.category = '';
	}
	if (typeof this.data.price != 'string') {
		this.data.price = '';
	}
	this.data = {
		name: this.data.name.trim(),
		category: this.data.category.trim(),
		price: this.data.price.trim(),
	};
};

Product.prototype.validate = function () {
	if (
		this.data.name === undefined ||
		this.data.name === '' ||
		!validator.isAlpha(this.data.name)
	) {
		this.errors.push('Provide a valid product name');
	}
	if (
		this.data.category === undefined ||
		this.data.category === '' ||
		!validator.isAlpha(this.data.category)
	) {
		this.errors.push('Provide a valid category');
	}
	if (
		this.data.price === undefined ||
		this.data.price === '' ||
		!validator.isNumeric(this.data.price)
	) {
		this.errors.push('Provide a valid price');
	}
};

Product.prototype.validateFromDB = function () {
	return new Promise((resolve, reject) => {
		if (this.errors.length === 0) {
			productsCollection
				.findOne({ name: this.data.name })
				.then((product) => {
					if (product === null) {
						resolve();
					} else {
						console.log(product);
						this.errors.push('product already available');
						reject();
					}
				})
				.catch((err) => {
					this.errors.push(err.message);
					reject();
				});
		} else {
			reject();
		}
	});
};

Product.prototype.create = function () {
	return new Promise(async (resolve, reject) => {
		this.cleanUp();
		this.validate();
		this.validateFromDB()
			.then(() => {
				console.log('inside then');
				if (this.errors.length > 0) {
					reject();
				} else {
					productsCollection
						.insertOne(this.data)
						.then((response) => {
							console.log(response);
							resolve(response);
						})
						.catch((errors) => {
							this.errors.push(errors);
							reject();
						});
				}
			})
			.catch(() => {
				reject();
			});
	});
};

Product.prototype.read = function () {
	console.log('here');
	return new Promise(async (resolve, reject) => {
		console.log('inside promise');
		let result = await productsCollection.find().toArray();
		if (result.length === 0) {
			this.errors.push('No products available');
			reject();
		} else {
			resolve(result);
		}
		// });
		console.log('at the end');
		// .then((products) => {
		// 	console.log(products);
		// 	resolve(products);
		// })
		// .catch((error) => {
		// 	console.log(error);
		// 	product.errors.push(error.message);
		// 	reject();
		// });
	});
};

Product.prototype.update = function (postId) {
	return new Promise((resolve, reject) => {
		this.cleanUp();
		this.validate();
		if (this.errors.length > 0) {
			reject();
		} else {
			productsCollection
				.findOneAndUpdate(
					{ _id: postId },
					{
						$set: {
							name: this.data.name,
							category: this.data.category,
							price: this.data.price,
						},
					}
				)
				.then((response) => {
					console.log(response);
					resolve(response);
				})
				.catch((error) => {
					this.errors.push(error.message);
					reject();
				});
			// resolve();
		}
	});
};

module.exports = Product;
