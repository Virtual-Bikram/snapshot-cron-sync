const { Schema, model, Types } = require('mongoose');

const snapshotSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: 'User', index: true },
		totalBalance: { type: Number, default: 0 }
	},
	{
		timestamps: true
	}
);

const Snapshot = model('Snapshot', snapshotSchema);

module.exports = { Snapshot };
