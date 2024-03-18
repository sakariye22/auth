const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: false },
  payment_method: { type: String, default: null },
  latitude: { type: mongoose.Types.Decimal128, default: null },
  longitude: { type: mongoose.Types.Decimal128, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
