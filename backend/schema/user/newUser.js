const prisma = require('../../database/prismaClient');

async function createUser({ name, email, phone }) {
    const user = await prisma.user.create({
        data: {
            name,
            email,
            phone: phone
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

module.exports = { createUser, getUserByEmail };
