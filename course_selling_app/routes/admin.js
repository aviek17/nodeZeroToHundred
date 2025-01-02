const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middlewares/admin");


router.post("/signup", adminMiddleware, (req, res) => {

})



module.exports = router;