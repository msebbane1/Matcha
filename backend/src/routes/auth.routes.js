const express = require('express');
const router = express.Router();
const authController = require('../controllers/Auth/auth.controller');

// Routes pour /auth
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);
router.get('/verify-account/:verificationId', authController.verifyAccount);

module.exports = router;
