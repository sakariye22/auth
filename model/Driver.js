const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  // Add timestamps
  }, { timestamps: true });
  
module.exports = mongoose.model('Driver', driverSchema);
