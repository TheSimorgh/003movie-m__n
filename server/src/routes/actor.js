const express = require("express");
const { all_actor, single_actor, create_actor, update_actor, delete_actor, search, latest_uploads } = require("../ctrl/actor");
const router = express.Router();
router.get("/",(req,res)=>{console.log("1")} );



router.get("/all",all_actor)
router.get("/single/:id",single_actor)
router.post("/create",create_actor)
router.put("/update/:actorId",update_actor)
router.delete("/:actorId",delete_actor)
router.get("/search",search)
router.get("/latest-uploads",latest_uploads)
module.exports = router;