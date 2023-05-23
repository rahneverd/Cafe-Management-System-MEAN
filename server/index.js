require('dotenv').config();
const express = require('express');
const router = require('./router');
const app = express();

app.use(router);

app.listen(process.env.PORT, () => {
	console.log('listening on port ' + process.env.PORT);
});
