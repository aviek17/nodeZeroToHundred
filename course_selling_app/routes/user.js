const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middlewares/user");
const { Course, User } = require("../db");


router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    const userData = await User.find({ userName: username });

    if (userData.length > 0) {
        return res.status(409).json({ error: "User already exists." });
    }
    else {
        const newUser = new User({ userName: username, password });
        await newUser.save();
        return res.status(201).json({ message: "User created successfully." });
    }

})

router.get("/courses", async (req, res) => {
    try {
        const courseList = await Course.find({ isPublished: true });
        return res.status(200).json({ courseList });
    }
    catch (err) {
        return res.status(500).send("System error occurred");
    }
})


router.post("/courses/:courseId", userMiddleware, async (req, res) => {

})

router.get("/purchased-courses", userMiddleware, async (req, res) => {

})


module.exports = router;