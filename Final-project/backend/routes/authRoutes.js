const express = require('express');
const router = express.Router();

const actrl = require("../controller/authController");

router.post("/register",actrl.registerUser);
router.post("/verify-otp",actrl.verifyOtp);
router.post("/login",actrl.loginUser);

module.exports = router;