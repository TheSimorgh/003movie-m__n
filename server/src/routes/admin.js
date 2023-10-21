// const express = require("express");
// const router = express.Router();

const { get_most_rated_movies,get_app_info } = require("../ctrl/admin");
const { isAdmin,isAuth } = require("../midd/auth")


const router=require("express").Router()

router.get("/app-info",isAuth,isAdmin,get_app_info)
router.get("most-rated",isAuth,isAdmin,get_most_rated_movies)

// router.get("/",(req,res)=>{
//     console.log("1")
//     res.json({message:"1"})} );


module.exports = router;