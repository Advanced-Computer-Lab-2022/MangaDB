const jwt = require("jsonwebtoken");


exports.validateToken = async (req, res, next) => {

   
    const token = req.cookies.token;
    if (!token)
     return res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(403).send("Invalid token.");

    }
    }

exports.authenticateRole=(roles)=>{
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next();
        }else{
            res.status(403).send("You are not authorized to access this resource.");
        
    }}
}