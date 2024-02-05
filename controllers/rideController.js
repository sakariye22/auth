const Ride = require('../model/Ride');

// Function to request a ride
const requestRide = async (req, res) => {
  try {
    const { userId, pickupLatitude, pickupLongitude, dropoffLocation, fare } = req.body;
    const ride = new Ride({
      user: userId,
      pickupLocation: { type: 'Point', coordinates: [pickupLongitude, pickupLatitude] },
      dropoffLocation,
      status: 'requested',
      fare
    });
    await ride.save();
    res.status(201).json({ message: "Ride requested successfully", ride });
  } catch (error) {
    res.status(500).json({ message: "Error requesting ride", error: error.message });
  }
};

// Example function to update ride status (You can add more functions like this)
const updateRideStatus = async (req, res) => {
  // Implementation for updating ride status
};

// Exporting the functions
module.exports = {
  requestRide,
  updateRideStatus,
  // any other functions you define related to rides
};
