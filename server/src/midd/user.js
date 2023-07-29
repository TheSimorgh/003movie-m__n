const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helpers");
exports.isValidPassResetToken = async (req, res, next) => {
    const { token, userId } = req.body;
    if (!token.trim() || !isValidObjectId(userId))return sendError(res, "Invalid request!");
    const resetToken = await PasswordResetToken.findOne({ owner: userId });
    if (!resetToken)return sendError(res, "Unauthorized access, invalid request!");
    console.log("resetToken");
    console.log(resetToken);
    const matched = await resetToken.compareToken(token);
    if (!matched) return sendError(res, "Unauthorized access, invalid request!"); 
    req.resetToken = resetToken;
    next();
};