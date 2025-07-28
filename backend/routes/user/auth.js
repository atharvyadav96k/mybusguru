const express = require('express');
const auth = express.Router();
const {createUser, getUserByEmail} = require('../../schema/user/newUser');
const {maskEmail} = require('../../controller/email');
const {maskPhone} = require('../../controller/phone');
const {sendOTP, verifyOTP} = require('../../controller/otp');

auth.post('/sign-up', async (req, res) => {
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

auth.post('/verify-opt', async (req, res)=>{
    const {opt, phone} = req.body;
    try{
        if(!opt || !phone) {
            return res.status(400).json({ error: 'OTP and phone are required' });
        }
        const isValid = await verifyOTP(phone, opt);
        if(isValid) {
            return res.status(200).json({ message: 'OTP verified successfully' });
        }
        return res.status(400).json({ error: 'Invalid OTP' });
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Error verifying OTP' });
    }
});

auth.post('/sign-in', async (req, res) => {
    const { email, phone } = req.body;
    try {
        if(!email || !phone) {
            return res.status(400).json({ error: 'Email and phone are required' });
        }
        const user = await getUserByEmail(email);
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }
        await sendOTP(phone, email);
        res.status(200).json({ message: 'OTP sent successfully to phone & email '+ maskPhone(`${phone}`) + ' and ' + maskEmail(`${email}`) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error signing up user' });
    } 
});

module.exports = auth;