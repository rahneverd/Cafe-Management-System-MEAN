let Product = function (data) {
	this.data = data;
	this.errors = [];
	// console.log(data);
};

Product.prototype.validate = function () {
	if (this.data.name === undefined || this.data.name === '') {
		this.errors.push('Provide a valid product name');
	}
	if (this.data.category === undefined || this.data.category === '') {
		this.errors.push('Provide a valid category');
	}
	if (this.data.price === undefined || this.data.price === '') {
		this.errors.push('Provide a valid price');
	}
};

Product.prototype.create = function () {
	return new Promise((resolve, reject) => {
		this.validate();
		if (this.errors.length > 0) {
			reject(this.errors);
		} else {
			resolve();
		}
	});
};

module.exports = Product;
