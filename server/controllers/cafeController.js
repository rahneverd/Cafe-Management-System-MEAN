const Cafe = require('../models/Cafe');

exports.register = function (req, res) {
	let cafe = new Cafe(req.body.cafe);
	cafe
		.register()
		.then(() => {
			res.send('success');
		})
		.catch((errors) => {
			console.log(errors);
			res.send(cafe.errors);
		});
};
