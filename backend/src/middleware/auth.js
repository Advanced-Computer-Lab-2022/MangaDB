const jwt = require("jsonwebtoken");
const blackList = require("../models/token");

exports.validateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) return res.status(401).send("Access denied. No token provided.") ;

  const isBlacklisted = await blackList.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).send("Access denied. Token is blacklisted.");
  }
  try {
    if (token != "null") {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
   
    }
    next();
  } catch (ex) {
    res.status(403).send("Invalid token.");
  }
};

exports.authenticateRole = (roles) => {
  return (req, res, next) => {
    if(req.user) {
    if (roles.includes(req.user.role)) {
      next();
    } 
      }else {
      res.status(403).send("You are not authorized to access this resource.");
    }
  };
};
