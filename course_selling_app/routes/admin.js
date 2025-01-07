const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middlewares/admin");


router.post("/signup", adminMiddleware, (req, res) => {

})

router.post("/courses", adminMiddleware, (req, res) => {
    
})


router.get("/courses", adminMiddleware, (req, res) => {

})



module.exports = router;