const redisClient = require('../cache/redis');

const expireTime = 90;

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // returns a 6-digit OTP as a string
}

async function isOTPisInRedis(phone) {
    const otp = await redisClient.get(`OTP:${phone}`);
    console.log("OTP in Redis: ", otp);
    return otp != null;
}

async function storeOTPInRedis(phone) {
    const otp = generateOTP();
    console.log("Generated OTP: ", otp);
    await redisClient.set(`OTP:${phone}`, otp);
    await redisClient.expire(`OTP:${phone}`, 90); // Set OTP to expire in 5 minutes
    return otp;
}

async function deleteOTP(phone) {
    await redisClient.del(`OTP:${phone}`);
}

async function getOTP(phone) {
    const otp = await redisClient.get(`OTP:${phone}`);
    return otp || null;
}

async function verifyOTP(phone, otp) {
    const storedOTP = await getOTP(phone);
    console.log("Stored OTP: ", storedOTP);
    await deleteOTP(phone);
    console.log(`${storedOTP} : ${otp}`);
    return otp === storedOTP;
}

async function sendOTP(phone, email) {
    try {
        let otp;

        if (await isOTPisInRedis(phone)) {
            // resend existing OTP
            otp = await getOTP(phone);
            console.log("Resending existing OTP to:", phone, "OTP:", otp);
        } else {
            // generate and store new OTP
            otp = await storeOTPInRedis(phone);
            console.log("Sending new OTP to:", phone, "OTP:", otp);
        }

        // Simulate sending via SMS or email here

        return { message: 'OTP sent to phone number ' + phone };
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { error: 'Failed to send OTP' };
    }
}

exports.sendOTP = sendOTP;
exports.verifyOTP = verifyOTP;