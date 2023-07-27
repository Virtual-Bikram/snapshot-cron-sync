const { Schema, model } = require('mongoose');

const subscriptionSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
		planId: { type: Schema.Types.ObjectId, ref: 'Plans', index: true },
		status: { type: Boolean, default: true }
	},
	{ timestamps: true }
);

const Subscription = model('Subscription', subscriptionSchema);

module.exports = { Subscription };
