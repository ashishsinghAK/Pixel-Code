const express = require('express');
const router = express.Router();

const {Login,Signup,sendOTP,ChangePassword} = require('../controller/Auth');
// const {resetPasswordToken,resetPassword} = require('../controller/resetPassword');
const {auth} = require('../middleware/authMiddleware');

//Routes

router.post("/login",Login);
router.post("/signup",Signup);
router.post("/sendotp",sendOTP);
router.post("/changepassword",ChangePassword);

// //Route for generating a reset password token
// router.post("/reset-password-token",resetPasswordToken);
// //Route for re-setting user passsword after verification
// router.post("/reset-password",resetPassword);


module.exports = router;