const { Admin } = require("../db/index")
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

/*
using username and password
const adminMiddleware = async (req, res, next) => {
    const username = req.headers.username;
    const password = req.headers.password;
    if (!username || !password) {
        return res.status(401).send("Unauthorized. Please provide username and password.");
    }

    try{
        const data = await Admin.findOne({userName : username, password : password});
        if(!data){
            return res.status(403).send("No such admin exists.");
        }
        next();
    }
    catch(err){
        return res.status(500).send("System error occurred");
    }
}

*/

// using JWT token
const adminMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    const jwtToken = token.split(" ")[1];
    if (!jwtToken) {
        return res.status(401).send("Unauthorized. Please provide a valid JWT token.");
    }
    const decodedToken = jwt.verify(jwtToken, JWT_SECRET_KEY);
    if (decodedToken.username) {
        next();
    }
    else {
        res.status(403).json({ msg: "Invalid or expired JWT token" });
    }
}



module.exports = adminMiddleware;