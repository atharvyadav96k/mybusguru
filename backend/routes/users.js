const express = require('express');
const user = express.Router();
const {createUser} = require('../schema/newUser');


user.post('/register', async (req, res) => {
    const { name, email } = req.body;

    try {
        console.log(name, email);
        const newUser = await createUser({ name, email });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
            res.status(409).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Error creating user' });
        }
    }
});


module.exports = user;