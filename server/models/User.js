let User = function (data) {
	this.data = data;
	this.errors = [];
};
// For internal use only
User.prototype.validate = function () {
	if (this.data.username == '') {
		this.errors.push('Username cannot be empty');
	}
	if (this.data.password == '') {
		this.errors.push('Password cannot be empty');
	}
	if (this.data.email == '') {
		this.errors.push('Email cannot be empty');
	}
};

// For external use only
User.prototype.register = function () {
	// Step 1 - Validate User
	this.validate();
	// Step 2 - Only if there are no validation errors
	// Step 3 -Save the use into database
};

module.exports = User;
