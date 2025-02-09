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
        const courseList = await Course.find({ isPublished: true }).select("_id title description imageLink price");
        return res.status(200).json({ courseList });
    }
    catch (err) {
        return res.status(500).send("System error occurred");
    }
})

//add purchased course under user
router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const courseId = req.params.courseId;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found." });
        }

        //const coursePurchased = await User.findOne({userName : username});
        //if(coursePurchased.purchasedCourses.includes(courseId)){
        //  return res.status(409).json({ error: "Course already purchased." });
        //}
        //const user = await User.findOneAndUpdate({ userName: username }, { $push: { purchasedCourses: courseId } }, { new: true });
        //return res.status(200).json({ message: "Course added to purchased courses successfully." });

        const updatedUser = await User.findOneAndUpdate(
            { userName: username, purchasedCourses: { $ne: courseId } }, // Only update if courseId is not in purchasedCourses
            { $push: { purchasedCourses: courseId } },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(409).json({ error: "Course already purchased" });
        }

        return res.status(200).json({ message: "Course purchased successfully." });
    }
    catch (err) {
        return res.status(500).send("System error occurred");
    }

})

router.get("/purchased-courses", userMiddleware, async (req, res) => {
    const userName = req.headers.username;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const courseList = await Course.find({
            _id: { $in: user.purchasedCourses }
        }).select("_id title description imageLink price");

        return res.status(200).json({ purchasedCourses: courseList });

    }
    catch (e) {
        return res.status(500).send("System error occurred");
    }
})


module.exports = router;