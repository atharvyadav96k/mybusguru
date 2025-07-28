const prisma = require('../../database/prismaClient');
const { get } = require('../../routes/buses');

async function createRoute({ name, startPoint, endPoint,latitude, longitude,  }){
    const route = await prisma.route.create({
        data: {
            name,
            startPoint,
            endPoint,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        }
    });
    return route;
}

async function getRouteById(id) {
    const route = await prisma.route.findUnique({
        where: { id: parseInt(id) },
    });
    return route;
}

module.exports = { createRoute, getRouteById };
