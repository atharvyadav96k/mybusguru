const express = require('express');
const apiRoutes = express.Router();
const users = require('./users');
const buses = require('./buses');

apiRoutes.use('/users', users);
apiRoutes.use('/buses', buses);

module.exports = apiRoutes;