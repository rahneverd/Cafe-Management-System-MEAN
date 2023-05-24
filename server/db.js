require('dotenv').config();

const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.CONNECTIONSTRING);

async function start() {
	await client.connect();
	module.exports = client.db();
	const app = require('./index');
	app.listen(process.env.PORT, () => {
		console.log('listening on port ' + process.env.PORT);
	});
}

start();
