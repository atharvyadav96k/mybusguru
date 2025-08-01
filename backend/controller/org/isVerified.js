const {isVerifiedOrg, isBannedOrg} = require('../../schema/org/org');

const validateRequest = async (req, res, next)=>{
    const {id} = req.body;
    try{
        if(!id){
            return res.status(401).json({
                message: "Organization not exists! Please send valid request"
            });
        }
        if(!await isVerifiedOrg(id) && await isBannedOrg(id)){
            return res.status(401).json({
                message: "Unauthorized access, please verify your organization"
            });
        }
        next();
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            message: "Unauthorized access"
        });
    }
}

module.exports = {validateRequest};