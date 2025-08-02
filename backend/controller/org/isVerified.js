const { isVerifiedOrg, isBannedOrg } = require('../../schema/org/org');
const redisClient = require('../../cache/redis');
const { getOrgByCode } = require('../../schema/org/org');
const jwt = require('jsonwebtoken');

exports.validateRequest = async (req, res, next) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(401).json({
                message: "Organization not exists! Please send valid request"
            });
        }
        if (!await isVerifiedOrg(id) && await isBannedOrg(id)) {
            return res.status(401).json({
                message: "Unauthorized access, please verify your organization"
            });
        }
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Unauthorized access"
        });
    }
}

exports.isAuth = async (req, res, next) => {
    try {
        const session_token = req.cookies?.session_token || req.body.session_token;

        if (!session_token) {
            return res.status(401).json({ message: "Unauthorized: Missing token" });
        }

        // Verify JWT
        const decoded = jwt.verify(session_token, process.env.JWT_SECRET);
        const code = decoded.code;

        if (!code) {
            return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
        }

        const redisToken = await redisClient.get(`userToken:${code}`);

        console.log("redis Token  : ", redisToken);
        console.log("session Token: ", session_token);

        if(redisToken != session_token){
            return res.status(401).json({
                message: "Unauthorized: Expired token"
            })
        }
        // Fetch organization details using the code
        const orgDetails = await getOrgByCode(code);

        if (!orgDetails) {
            return res.status(401).json({ message: "Unauthorized: Organization not found" });
        }

        // Attach to request
        req.orgDetails = orgDetails;
        req.orgCode = code;
        console.log("Login Success", req);
        next(); 

    } catch (err) {
        console.error("Auth error:", err);
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
            error: err.message
        });
    }
};
