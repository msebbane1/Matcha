const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Routes pour /auth
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify-account/:verificationId', authController.verifyAccount);

module.exports = router;
