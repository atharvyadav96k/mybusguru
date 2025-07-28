const prisma = require('../database/prismaClient');

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

module.exports = { createUser };
