const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middlewares/admin");
const { Admin } = require("../db/index")


router.post("/signup", async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    if (!userName || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        const data = await Admin.findOne({ userName });
        if(data){
            return res.status(409).json({ error: "Admin already exists." });
        }
        const newAdmin = new Admin(
            {
                userName,
                password
            }
        )
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully." });
    } catch (err) {
        return res.status(400).send("System error occured")
    }


})

router.post("/courses", adminMiddleware, (req, res) => {

})


router.get("/courses", adminMiddleware, (req, res) => {

})



module.exports = router;