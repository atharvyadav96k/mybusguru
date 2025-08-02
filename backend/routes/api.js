const express = require('express');
const apiRoutes = express.Router();
const users = require('./users');
const buses = require('./buses');
const orgRouter = require('./orgRouter');

apiRoutes.use('/org', orgRouter)
apiRoutes.use('/users', users);
apiRoutes.use('/buses', buses);

module.exports = apiRoutes;