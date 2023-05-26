const cafesColection = require('../db.js').colection('cafes');
const ObjectID = require('mongodb').ObjectId;

let Cafe = function (data) {
	this.data = data;
	this.errors = [];
};

Cafe.prototype.cleanUp = function () {
	if (typeof this.data.name !== String) {
		this.data.name = '';
	}
	this.data = {
		name: this.data.name,
		owner: ObjectID(this.data.owner),
	};
};

Cafe.prototype.validate = function () {
	if (
		this.data.name === undefined ||
		this.data.name === '' ||
		!validator.isAlphanumeric(this.data.name)
	) {
		this.errors.push('Provide a valid cafe name');
	}
};

Cafe.prototype.create = function () {
	return new Promise((resolve, reject) => {
		this.cleanUp();
		this.validate();
		if (this.errors.length > 0) {
			reject();
		} else {
			cafesColection
				.insertOne(this.data)
				.then((response) => {
					resolve(response);
				})
				.catch((errors) => {
					console.log(errors);
					reject();
				});
			resolve('success');
		}
	});
};

module.exports = Cafe;
