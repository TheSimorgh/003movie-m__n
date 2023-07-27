const express = require("express");
const { register, verify_email, resend_email_verfication_token, login, forgot_password, send_reset_pass_token_status, reset_password, me,  } = require("../ctrl/user");
const router = express.Router();
router.get("/",(req,res)=>{console.log("1")} );


router.post("/register",register );
router.post("/login",login);
router.post("/verify-email", verify_email);
router.post("/resend-email-verification-token", resend_email_verfication_token);
router.get("/forgot-password",forgot_password );
router.get("/verify-pass-reset-token",send_reset_pass_token_status);
router.get("/reset-token", reset_password );
router.get("/me",me );


module.exports = router;