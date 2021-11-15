const jwt = require('jsonwebtoken');
const {JWT_KEY} = require("../secrets/secrets");
function protectRoute(req,res,next){
    let isToken = jwt.verify(req.cookies.jwt,JWT_KEY)
    if(isToken){
        // req.uid = isToken.id;
        // console.log(uid);
        next();
    }else{
        return res.status(203).json({message:"not autherised"});
    }
}
module.exports = protectRoute;