const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getMe } = require('../controllers/authController'); // import the controller

router.get('/me', verifyToken, getMe); // use the actual logic

module.exports = router;
