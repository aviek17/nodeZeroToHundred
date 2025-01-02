const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middlewares/user");


router.post("/signup", userMiddleware, (req, res) => {

})



module.exports = router;