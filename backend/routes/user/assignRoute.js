const express = require('express');
const route = express.Router();
const { updateUserRoute } = require('../../schema/user/newUser');


route.post('/assign-route', async (req, res) => {
    try {
        if(!routeId || !email){
            return res.status(400).json({
                message: "RouteId and Email are required"
            });
        }
        const { routeId, email } = await updateUserRoute(email, routeId);
        return res.status(200).json({
            message: "RouteId updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message
        });
    }
});

module.exports = route;