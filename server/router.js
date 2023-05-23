const router = require('express').Router();

router.get('/', function (req, res) {
	res.send(Welcome);
});

module.exports = router;
