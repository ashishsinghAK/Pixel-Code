const express = require('express');
const router = express.Router();

const {updateProfile,getUserDetail,deleteAccount} = require('../controller/profile');
const {auth,isStudent} = require('../middleware/authMiddleware');
const {resetPasswordToken,resetPassword} = require('../controller/resetPassword');


router.get('/getUserDetail',auth,getUserDetail);
router.delete('/deleteProfile',auth,isStudent,deleteAccount);
router.put('/updateProfile',auth,updateProfile);

//Password reset
router.post('/resetPasswordToken',resetPasswordToken);
router.post('/resetPassword',resetPassword);


module.exports = router;