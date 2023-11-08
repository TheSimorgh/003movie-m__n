const express = require("express");
const { isAdmin, isAuth } = require("../midd/auth");
const { create_review, get_review_by_movies, update_review, delete_review } = require("../ctrl/review");
const router = express.Router();
router.get("/",(req,res)=>{console.log("1");} );



router.post("/create/:movieId",isAuth,create_review)
router.patch("/create/:movieId",isAuth,update_review)
router.delete("/create/:movieId",isAuth,delete_review)
router.get("/get-reviews-by-movie/:movieId",isAuth,get_review_by_movies)

module.exports = router;