const express = require('express');
const router = express.Router();

const { capturePayment, verifyPayment } = require('../controller/payment');
const { auth, isStudent, isInstructor, isAdmin } = require('../middleware/authMiddleware');

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);

module.exports = router;
