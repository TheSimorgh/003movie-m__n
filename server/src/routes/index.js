
const express =require("express")
const user =require("./user")
const actor =require("./actor")
const movie =require("./movie")
const review =require("./review")
const admin =require("./admin")


const router = express.Router();

router.use("/user", user);
router.use("/actor", actor);
router.use("/movie", movie);
router.use("/review", review);
router.use("/admin", admin);


module.exports = router;