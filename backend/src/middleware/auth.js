const jwt = require("jsonwebtoken");


exports.validateToken = async (req, res, next) => {

    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(" ")[1];
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
        roles.forEach(role=>{
        if(req.user.role===role){
            next();
        }})
        
            res.status(403).send("You are not authorized to access this resource.");
        
    }
}