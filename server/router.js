const router = require('express').Router();
const userController = require('./controllers/userController');
const tableController = require('./controllers/tableController');
const productController = require('./controllers/productController');

// Home route
router.get('/', (req, res) => {
	// res.send('Hello');
	// console.log(req.query);
	// res.redirect('http://172.16.1.118:5002');
	res.send('Welcome To Cafe Management System');
});

// User Routes
router.get('/ums/register', userController.register);
router.get('/ums/login', userController.login);

// Product Routes
router.post('/product/create', productController.create);

module.exports = router;
