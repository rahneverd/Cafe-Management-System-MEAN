const validator = require('validator');

let Product = function (data) {
	this.data = data;
	this.errors = [];
	console.log(data);
};

Product.prototype.cleanUp = function () {
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
		name: this.data.name,
		category: this.data.category,
		price: this.data.price,
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

Product.prototype.create = function () {
	return new Promise((resolve, reject) => {
		this.cleanUp();
		this.validate();
		if (this.errors.length > 0) {
			reject(this.errors);
		} else {
			resolve();
		}
	});
};

module.exports = Product;
