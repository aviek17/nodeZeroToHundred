const { Admin } = require("../db/index")

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

module.exports = adminMiddleware;