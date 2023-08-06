const express = require("express");
const router = express.Router();
router.get("/",(req,res)=>{
    console.log("1")
    res.json({message:"1"})} );


module.exports = router;