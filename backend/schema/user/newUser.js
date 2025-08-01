const prisma = require('../../database/prismaClient');

async function createUser({ name, email, phone, orgId}) {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            phone: phone,
            orgId
        },
    });
    return user;
}

async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return user;
}

async function updateUserRoute(email, routeId){
    const user = await prisma.user.update({
        where: {email: email},
        data: {
            routeId: routeId
        }
    });
    return user;
}

module.exports = { createUser, getUserByEmail, updateUserRoute};
