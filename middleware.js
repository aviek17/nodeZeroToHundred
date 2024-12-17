const express = require('express');
const app = express();


/** 
 * 
 * middleware so that some part of the code should not be written everytime
 * 
 */

const userAuthentication = (req, res, next) => {
    //console.log(req.headers)
    if (req.headers.username === "USER" && req.headers.password === "PASSWORD") {
        next();
    }
    else {
        res.status(401).send("Invalid username or password");
    }
}


/** 
 * 
 * now to use this middleware in every route or every function, we dont have to pass that middleware 
 * explicitly in evry route or function this can be done using app.use()
 * 
 * 
 */


app.use(userAuthentication);

app.get("/", (req, res) => {
    res.send("Hello World!");
})



app.listen(3000, () => {
    console.log("App is listening on port 3000")
});