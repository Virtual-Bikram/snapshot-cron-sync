const express = require('express');
require('dotenv').config();
const app = express();

require('./db.js');

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
