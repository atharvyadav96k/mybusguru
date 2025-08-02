const express = require('express');
const orgRouter = express.Router();
const admin = require('./org/admin');
const bcrypt = require('bcrypt');
const {createOrg, getOrgByCode} = require('../schema/org/org');
const {validateRequest} = require("../controller/org/isVerified");
const crypto = require('crypto');
const redisClient = require('../cache/redis');

orgRouter.use('/admin',admin);

orgRouter.post('/register',async (req, res)=>{
    const {name, code, phone, address, email ,password} = req.body;
    try{
        if(!name || !code || !phone || !address || !password || !email){
            return res.status(400).json({
                message: "All fields are required name, code, phone, address, password, email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
        const org = await createOrg(name, code, email,phone, address, hashedPassword);
        
        return res.status(201).json({
            message: "Organization created successfully",
            org: {
                name: org.name,
                code: org.code,
                phone: org.phone,
                address: org.address
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Error while creating and organization. Please try again.",
            error: error.message
        })
    }
});

orgRouter.post('/login', async (req, res)=>{
    const {code, password} = req.body;
    try{
        if(!code || !password){
            return res.status(401).json({
                message: "All fields are required!"
            });
        }
        const org = await getOrgByCode(code);
        if(!org){
            return res.status(404).json({
                message: "Organization not found"
            });
        }
        const validCredentials = bcrypt.compare(password, org.password);
        if(validCredentials){
            const token = crypto.randomBytes(32).toString("hex");
            await redisClient.set(`userToken:${code}`, token);
            await redisClient.expire(`userToken:${code}`, (24 * 60 * 60) * 3);
            // Expire in 3 days
            res.cookie('session_token', token, {
                secure: true,
                sameSite: 'strict',
                expires: 24 * 60 * 60 * 1000 * 3
            });
            return res.status(200).json({
                message: "Login Successful"
            })
        }
        return res.status(401).json({
            message: "Invalid credentials please try again!"
        })
    }catch(err){
        
    }
})


module.exports = orgRouter;