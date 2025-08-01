const express = require('express');
const user = express.Router();
const { createUser } = require('../../schema/user/newUser')
const { getOrgByCode } = require('../../schema/org/org');

user.post('/new-user', async (req, res) => {
    const { name, email, phone } = req.body;
    const { code } = req.query;
    let userOrg;
    try {
        userOrg = await getOrgByCode(code);
        if (!userOrg) {
            return res.status(404).json({
                message: "Can't find organization"
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Can't find organization",
            error: error.message
        })
    }
    try {
        console.log(name, email, phone, orgId);
        const newUser = await createUser({ name, email, phone, userOrg });
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