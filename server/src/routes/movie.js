const express = require("express");
const { isAdmin, isAuth } = require("../midd/auth");
const { upload_trailer, create_movie, update_movie_without_poster, update_movie, delete_movie, get_movies, get_movie_update, search_movies, get_latest_uploads, get_single_movie, get_related_movies, get_top_rated_movies, search_public_movies } = require("../ctrl/movie");
const { uploadVideo, uploadImage } = require("../midd/multer");
const { parseData } = require("../utils/helpers");
const { validate_movie, validate, validate_trailer } = require("../midd/validator");
const router = express.Router();

router.get("/",(req,res)=>{console.log("1")} );
//for admin
router.post("/upload-trailer",isAuth,isAdmin,uploadVideo.single("video"),  upload_trailer)
router.post("/create",isAuth,isAdmin,uploadImage.single("poster"),parseData,validate_movie,validate_trailer,validate, create_movie)
router.patch("/update_movie_without_poster/:movieId",update_movie_without_poster)
router.patch("/update/:movieId",update_movie)
router.delete("/delete/:movieId",delete_movie)
router.get("/movies",get_movies)
router.get("/for-update/:movieId",get_movie_update)
router.get("/search",search_movies)


//for users

router.get("/latest_uploads",get_latest_uploads)
router.get("/single/:movieId",get_single_movie)
router.get("/related/:movieId",get_related_movies)
router.get("/top_rated",get_top_rated_movies)
router.get("/search_public",search_public_movies)

module.exports = router;
