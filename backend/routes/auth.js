const express = require('express');
const { body } = require('express-validator');
const { signupUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
], signupUser);

router.post('/login', loginUser);

module.exports = router;
