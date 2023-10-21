const Movie=require("../models/movie")
const Review=require("../models/review")
const User=require("../models/user")


exports.get_app_info=async(req,res)=>{


    res.json({appInfo:{}})
}

exports.get_most_rated_movies=async(req,res)=>{
    res.json({ movies: topRatedMovies });
}