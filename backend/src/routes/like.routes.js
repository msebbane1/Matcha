const express = require('express');
const router = express.Router();
const likeController = require('../controllers/Like/like.controller');

router.post('/like', likeController.likeProfile);
router.get('/likes', likeController.getLikedProfiles);

module.exports = router;
