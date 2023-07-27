const { Schema, model } = require("mongoose");

const plansSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  syncRepetation: { type: Number, required: true },
  syncPeriod: { type: String, enum: ["DAY", "HOUR"], required: true },
  description: { type: String, requred: false },
  expiresInDays: { type: Number, required: true },
  planCode: { type: String, required: true },
},{
  timestamps: true
});

const Plans = model("Plans", plansSchema);

module.exports = { Plans }