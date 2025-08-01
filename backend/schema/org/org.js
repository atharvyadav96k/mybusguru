const prisma = require('../../database/prismaClient');

async function createOrg(name, code, phone, address, password) {
    const org = await prisma.org.create({
        data: {
            name,
            code,
            phone,
            address,
            password
        }
    });
    return org;
}

async function getOrgByCode(code) {
    const org = await prisma.org.findUnique({
        where: {code: code}
    });
    return org;
}
async function updateOrg(id, name, code, phone, address) {
    const org = await prisma.org.update({
        where: {id: parseInt(id)},
        data: {
            name,
            code,
            phone,
            address
        }
    });
    return org;
}

async function verifyOrg(id){
    const org = await prisma.org.update({
        where: {id: parseInt(id)},
        data: {
            isVerified: true
        }
    })
    return org;
}

async function isVerifiedOrg(id){
    const isVerified = await prisma.org.findUnique({
        where: {id: parseInt(id)},
    });
    return isVerified.isVerified
}

async function disableOrg(id) {
    const org = await prisma.org.update({
        where: {id: parseInt(id)},
        data: {
            isVerified: false
        }
    })
    return org;
}

async function banOrg(id){
    const org = await prisma.org.update({
        where: {id: parseInt(id)},
        data: {
            banOrg: true,
            isVerified: false
        }
    });
    return org;
}

async function unBanOrg(id){
    const org = await prisma.org.update({
        where: {id: parseInt(id)},
        data : {
            banOrg: false,
            isVerified: true
        }
    })
}

async function isBannedOrg(id) {
    const isVerified = await prisma.org.findUnique({
        where: {id: parseInt(id)},
    });
    return isVerified.banOrg
}
module.exports = {createOrg, updateOrg, disableOrg, banOrg, unBanOrg, verifyOrg, isVerifiedOrg, isBannedOrg, getOrgByCode};