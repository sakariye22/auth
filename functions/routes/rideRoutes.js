// In your rideRoutes.js or wherever you define your endpoints
const express = require('express');
const router = express.Router();
const { requestRide, updateRideStatus } = require('../controllers/rideController');

// Defining the route for ride requests
router.post('/rides/request', requestRide);

// Defining the route for updating ride status
router.put('/rides/:rideId/status', updateRideStatus);

// Export the router
module.exports = router;
