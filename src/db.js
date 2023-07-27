const { connect } = require('mongoose');
require('dotenv').config();

const mongoDB = process.env.MONGO_URI;

// Connect mongo
connect(mongoDB).then(() => console.log('DB Connected!')).catch((err) => {
	console.log(`DB Connection Error: ${err.message}`);
});
