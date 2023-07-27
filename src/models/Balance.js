const { Schema, model, Types } = require('mongoose');

const balanceSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: 'User', index: true },
		balance: { type: Number, default: 0 },
		sync_time: { type: Number, default: 1 },
		account: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

const Balance = model('Balance', balanceSchema);

module.exports = { Balance };
