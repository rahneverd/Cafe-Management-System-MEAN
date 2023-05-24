const router = require('express').Router();
const userController = require('./controllers/userController');

// User Routes
router.get('/user/register', userController.register);

module.exports = router;
