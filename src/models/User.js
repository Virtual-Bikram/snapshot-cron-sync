const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	sync_time: { type: Number, default: 1 },
	last_queue_time: { type: Number, default: 1 },
	role: { type: String, required: true },
	status: { type: Boolean, default: true },
	first_sync: { type: Boolean, default: true },
	sync_running: { type: Boolean, default: false },
	next_sync_time: { type: Number, default: 1 },
	address: { type: String, required: true },
	account_type: { type: String, redefined: true, default: 'standard' }
});

const User = model('User', userSchema);

module.exports = { User };
