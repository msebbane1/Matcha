const express = require('express');
const router = express.Router();
const likeController = require('../controllers/Like/like.controller');

router.post('/like', likeController.likeProfile);
router.post('/likes', likeController.checkLikedProfiles);
router.post('/getlikes', likeController.getLikes);

module.exports = router;
