const express = require('express');
const busesRouter = express.Router();
const { createRoute, getRouteById } = require('../../schema/bus/newRoutes');

busesRouter.post('/new', async (req, res) => {
    const { name, startPoint, endPoint, latitude, longitude } = req.body;

    if (!name || !startPoint || !endPoint || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newRoute = await createRoute({ name, startPoint, endPoint, latitude, longitude });
        return res.status(201).json(newRoute);
    } catch (error) {
        console.error('Error creating route:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

busesRouter.get('/get/:id', async (req, res) => {
    const routeId = req.params.id;
    try{
        if (!routeId) {
            return res.status(400).json({ error: 'Route ID is required' });
        }
        const route = await getRouteById(routeId);
        if (!route) {
            return res.status(404).json({ error: 'Route not found' });
        }
        return res.status(200).json(route);
    }catch(error) {
        console.error('Error fetching route:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = busesRouter;