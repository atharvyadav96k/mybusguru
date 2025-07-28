const express = require('express');
const busRouter = express.Router();
const redisClient = require('../../cache/redis');

// store bus location for 15 seconds as well as update the last location of the bus
async function setLocation(busId, latitude, longitude) {
    const timestamp = new Date().toISOString();
    const locationData = {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        timestamp
    };  
    await redisClient.hSet(`bus:${busId}`, locationData); 
    await Promise.all([
        redisClient.expire(`bus:${busId}`, 15),
        redisClient.hSet(`bus_last_location:${busId}`, locationData)
    ]);
}

busRouter.get('/is-sharing/:busId', async (req, res) => {
    const { busId } = req.params;
    if (!busId) {
        return res.status(400).json({ error: 'Bus ID is required' });
    }
    try {
        const isSharing = await redisClient.exists(`bus:${busId}`);
        res.status(200).json({ isSharing: isSharing === 1 });
    } catch (error) {
        console.error('Error checking bus sharing status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

busRouter.post('/setLocation', async (req, res) => {
    const { busId, latitude, longitude } = req.body;

    if (!busId || !latitude || !longitude) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await setLocation(busId, latitude, longitude);
        res.status(200).json({ message: 'Bus location updated successfully' });
    } catch (error) {
        console.error('Error updating bus location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

busRouter.get('/getLocation/:busId', async (req, res) => {
    const { busId } = req.params;

    if (!busId) {
        return res.status(400).json({ error: 'Bus ID is required' });
    }

    try {
        const location = await redisClient.hGetAll(`bus:${busId}`);

        if (Object.keys(location).length === 0) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        res.status(200).json(location);
    } catch (error) {
        console.error('Error retrieving bus location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

busRouter.delete('/stop-sharing/:busId', async (req, res) => {
    const { busId } = req.params;

    if (!busId) {
        return res.status(400).json({ error: 'Bus ID is required' });
    }

    try {
        const result = await redisClient.del(`bus:${busId}`);

        if (result === 0) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        res.status(200).json({ message: 'Bus location stopped successfully' });
    } catch (error) {
        console.error('Error stopping bus location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

busRouter.get('/last-location/:busId', async (req, res) => {
    const { busId } = req.params;

    if (!busId) {
        return res.status(400).json({ error: 'Bus ID is required' });
    }

    try {
        const lastLocation = await redisClient.hGetAll(`bus_last_location:${busId}`);

        if (Object.keys(lastLocation).length === 0) {
            return res.status(404).json({ error: 'Last location not found for this bus' });
        }

        res.status(200).json(lastLocation);
    } catch (error) {
        console.error('Error retrieving last bus location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = busRouter;

