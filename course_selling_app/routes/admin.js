const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middlewares/admin");
const { Admin, Course } = require("../db/index")


router.post("/signup", async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    if (!userName || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        const data = await Admin.findOne({ userName });
        if (data) {
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

router.post("/courses", adminMiddleware, async (req, res) => {
    const { title, description, imageLink, price, isPublished } = req.body;
    if(!title || !price || price <=0 ){
        return res.status(400).json({ error: "Title, price is required" });
    }

    try {
        const newCourse = new Course({
            title,
            description,
            imageLink,
            price,
            isPublished
        })
        await newCourse.save();
        
        res.status(201).json({ message: "Course created successfully." });
    }
    catch(err){
        return res.status(400).send("System error occured")
    }

})


router.get("/courses", adminMiddleware, async (req, res) => {
    try{
        const courseList = await Course.find({});
        return res.status(200).json({courseList});
    }
    catch(err){
        return res.status(500).send("System error occurred");
    }
})



module.exports = router;