const express = require('express');
const buses = express.Router();
const busLocation = require('./buses/busesLocation');
const busRoutes = require('./buses/busesRoutes');

buses.use('/locations', busLocation);
buses.use('/routes', busRoutes);
module.exports = buses;