const express = require('express');
const user = express.Router();

const authRouter = require('./user/auth');
const details = require('./user/details');

user.use('/auth', authRouter);
user.use('/update', details);

module.exports = user;