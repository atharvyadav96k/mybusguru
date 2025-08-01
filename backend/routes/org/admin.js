const express = require('express');
const admin = express.Router();
const assignRoute = require('../user/assignRoute');
const user = require('../org/user');

admin.use('/users', user);
admin.post('/routes', assignRoute);

module.exports = admin;