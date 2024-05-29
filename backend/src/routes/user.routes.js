const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/infos', userController.getAllUsers);
router.post('/filtered-users', userController.getFilteredUsers);

module.exports = router;