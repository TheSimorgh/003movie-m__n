const express = require("express");
const { all_actor, single_actor, create_actor, update_actor, delete_actor,   latest_actors, search_actor } = require("../ctrl/actor");
const { uploadImage } = require("../midd/multer");
const { validate_actor_info, validate } = require("../midd/validator");
const { isAuth, isAdmin } = require("../midd/auth");
const router = express.Router();
router.get("/",(req,res)=>{console.log("1")} );



router.get("/all/actors",isAuth,isAdmin, all_actor)
router.get("/single/:id", single_actor)
router.post("/create",isAuth,isAdmin, uploadImage.single("avatar"), validate_actor_info,validate, create_actor)
router.put("/update/:actorId",isAuth,isAdmin, uploadImage.single("avatar"),update_actor)
router.delete("/:actorId",isAuth,isAdmin,delete_actor)
router.get("/search",isAuth,isAdmin,search_actor)
router.get("/latest-uploads",latest_actors)

module.exports = router;