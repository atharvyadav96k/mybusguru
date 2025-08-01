const express = require('express');
const orgRouter = express.Router();
const admin = require('./org/admin');
const bcrypt = require('bcrypt');
const {createOrg} = require('../schema/org/org');
const {validateRequest} = require("../controller/org/isVerified")

orgRouter.use('/admin',admin);

orgRouter.post('/register', validateRequest,async (req, res)=>{
    const {name, code, phone, address, password} = req.body;
    try{
        if(!name || !code || !phone || !address || !password){
            return res.status(400).json({
                message: "All fields are required name, code, phone, address, password",
            });
        }

        const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT);
        const org = await createOrg(name, code, phone, address, hashedPassword);
        
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



module.exports = orgRouter;