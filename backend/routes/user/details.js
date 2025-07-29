const express = require('express');
const details = express.Router();

details.patch('/details', async (req, res)=>{
    res.json({
        message: "Updated Successfully!",
        success: true
    });
});

module.exports = details;