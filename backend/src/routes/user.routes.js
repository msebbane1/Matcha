const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/infos', userController.getAllUsers);

module.exports = router;