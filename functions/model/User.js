const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paymentMethod: { type: String, required : false },
  latitude: { // Change from 'lat' to 'latitude'
    type: Number,
    required: [false, 'Latitude is required'], 
    min: -90,
    max: 90,
  },
  longitude: { // Change from 'lng' to 'longitude'
    type: Number,
    required: [false, 'Longitude is required'], 
    min: -180,
    max: 180,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
