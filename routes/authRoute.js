const express = require('express');
const router = express.Router();
const {
  login,
  register,
  createTestAcc,
} = require('../controllers/authController');
const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

router.route('/login').post(apiLimiter, login);
router.route('/register').post(apiLimiter, register);
router.route('/createTestAcc').get(createTestAcc);

module.exports = router;
