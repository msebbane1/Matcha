const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users/user.controller');


router.post('/infos', userController.getPublicInfosUsers);
router.post('/filtered-users', userController.getFilteredUsers);
router.post('/sort-age', userController.sortByAgeUsers);

module.exports = router;