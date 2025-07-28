const express = require('express');
const user = express.Router();

const authRouter = require('./user/auth');

user.use('/auth', authRouter);

module.exports = user;