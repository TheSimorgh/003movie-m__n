const { sendError } = require("../utils/helpers");
const Movie = require("../models/movie");
const Review = require("../models/review");
const { isValidObjectId } = require("mongoose");



exports.create_review = async (req, res) => {

    const {movieId}=req.params;
    const {content,rating}=req.body;
    const userId=req.user._id

    if(!req.user.isVerified) return sendError(res,"Please verify you email first!");
    if(!isValidObjectId(movieId)) return sendError(res, "Invalid Movie!");
   
   
    console.log(req.body);
    res.json({
      message: 1,
    });
  };
  
  exports.update_review = async (req, res) => {
    console.log(req.body);
    res.json({
      message: 1,
    });
  };
  
  exports.delete_review = async (req, res) => {
    console.log(req.body);
    res.json({
      message: 1,
    });
  };
  
  exports.get_review_by_movies = async (req, res) => {
    console.log(req.body);
    res.json({
      message: 1,
    });
  };
  

exports.test = async (req, res) => {
    console.log(req.body);
    res.json({
      message: 1,
    });
  };
  