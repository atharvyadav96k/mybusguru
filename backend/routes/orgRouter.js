const express = require('express');
const orgRouter = express.Router();
const admin = require('./org/admin');
const bcrypt = require('bcrypt');
const { createOrg, getOrgByCode } = require('../schema/org/org');
const { isAuth } = require("../controller/org/isVerified");
const redisClient = require('../cache/redis');
const jwt = require('jsonwebtoken');

orgRouter.use('/admin', isAuth, admin);

orgRouter.post('/register', async (req, res) => {
    const { name, code, phone, address, email, password } = req.body;
    try {
        if (!name || !code || !phone || !address || !password || !email) {
            return res.status(400).json({
                message: "All fields are required name, code, phone, address, password, email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
        const org = await createOrg(name, code, email, phone, address, hashedPassword);

        return res.status(201).json({
            message: "Organization created successfully",
            org: {
                name: org.name,
                code: org.code,
                phone: org.phone,
                address: org.address
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while creating and organization. Please try again.",
            error: error.message
        })
    }
});

orgRouter.post('/login', async (req, res) => {
    const { code, password } = req.body;
    try {
        if (!code || !password) {
            return res.status(401).json({
                message: "All fields are required!"
            });
        }

        const org = await getOrgByCode(code);
        if (!org) {
            return res.status(404).json({
                message: "Organization not found"
            });
        }

        const validCredentials = await bcrypt.compare(password, org.password);

        if (validCredentials) {
            // secret
            const jwtToken = jwt.sign({code: code, time: new Date()}, process.env.JWT_SECRET);

            // Save token in Redis with 3-day expiry
            await redisClient.set(`userToken:${code}`, jwtToken);
            await redisClient.expire(`userToken:${code}`, 3 * 24 * 60 * 60); // 3 days in seconds

            // Set cookie
            res.cookie('session_token', jwtToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days 
            });

            return res.status(200).json({
                message: "Login Successful"
            });
        }

        return res.status(401).json({
            message: "Invalid credentials. Please try again!"
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});



module.exports = orgRouter;