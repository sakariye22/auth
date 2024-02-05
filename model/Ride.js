const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropoffLocation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['requested', 'accepted', 'enroute', 'completed', 'cancelled'],
    default: 'requested',
  },
  fare: {
    type: Number,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // In your rideSchema
pickupLocation: {
  type: { type: String, default: 'Point' },
  coordinates: [Number], // [longitude, latitude]
  required: true
},
// Optionally, if you want to track the driver's location for assignment
driverLocation: {
  type: { type: String, default: 'Point' },
  coordinates: [Number], // This would be set when a driver accepts the ride
  required: false // Only required when a driver has been assigned
},

});

module.exports = mongoose.model('Ride', rideSchema);
