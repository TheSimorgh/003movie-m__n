const express = require("express");
const { register, verify_email, resend_email_verfication_token, login, forgot_password, send_reset_pass_token_status, reset_password, me,  } = require("../ctrl/user");
const { isValidPassResetToken } = require("../midd/user");
const { validate_register, validate_login, validate_password } = require("../midd/validator");
const { isAuth } = require("../midd/auth");
const router = express.Router();
router.get("/",(req,res)=>{console.log("1")} );


router.post("/register",validate_register, register );
router.post("/login", validate_login, login);
router.post("/verify-email", verify_email);
router.post("/resend-email-verification-token", resend_email_verfication_token);
router.get("/forgot-password",forgot_password );
router.get("/verify-pass-reset-token", isValidPassResetToken, send_reset_pass_token_status);
router.get("/reset-password",validate_password, isValidPassResetToken,reset_password );
router.get("/me", isAuth, me );


module.exports = router;