const express = require("express");
const { all_actor, single_actor, create_actor, update_actor, delete_actor,   latest_actors, search_actor } = require("../ctrl/actor");
const { uploadImage } = require("../midd/multer");
const { validate_actor_info, validate } = require("../midd/validator");
const router = express.Router();
router.get("/",(req,res)=>{console.log("1")} );



router.get("/all",all_actor)
router.get("/single/:id",single_actor)
router.post("/create", uploadImage.single("avatar"), validate_actor_info,validate, create_actor)
router.put("/update/:actorId", uploadImage.single("avatar"),update_actor)
router.delete("/:actorId",delete_actor)
router.get("/search",search_actor)
router.get("/latest-uploads",latest_actors)
// router.get("/",uploadImage.single("avatar"),(req,res)=>{
//    console.log(req.body);
//     res.json({message:"Hello"})
// })
module.exports = router;