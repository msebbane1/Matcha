const User = require('../../models/User');
const Like = require('../../models/Like');
const socketManager = require('../../socketManager');


exports.likeProfile = async (req, res) => {
  try {
      const { likerId, likedId } = req.body;
      if (!likerId || !likedId) {
          console.log('likerId:', likerId, 'likedId:', likedId);
          return res.status(400).send({ message: 'Missing likerId or likedId' });
      }
      
      console.log('likerId:', likerId, 'likedId:', likedId);
      
      const liker = await User.findByPk(likerId);
      const liked = await User.findByPk(likedId);
      
      if (!liker || !liked) {
          return res.status(404).send({ message: 'User not found' });
      }

      const like = await Like.create({ likerId, likedId });

      // Émission d'un événement à Socket.io pour informer du like
      socketManager.emitLikeNotification(likerId, likedId);

      res.json(like);
  } catch (err) {
      console.error('Erreur lors du like :', err);
      res.status(500).json({ message: err.message });
  }
};

/*
// Ajouter un like
const likeProfile = async (req, res) => {
  try {
    const { likerId, likedId } = req.body;
    if (!likerId || !likedId) {
      console.log('likerId:', likerId, 'likedId:', likedId);
      return res.status(400).send({ message: 'Missing likerId or likedId' });
    }
    
    console.log('likerId:', likerId, 'likedId:', likedId);
    
    const liker = await User.findByPk(likerId);
    const liked = await User.findByPk(likedId);
    
    if (!liker || !liked) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    await Like.create({ likerId, likedId });
    res.status(200).send({ message: 'Profile liked successfully' });
  } catch (err) {
    console.error('Error creating like:', err);
    res.status(500).send(err);
  }
};*/


// Obtenir les profils likés
exports.getLikedProfiles = async (req, res) => {
  const { userId } = req.query;
  try {
    const likedProfiles = await Like.findAll({
      where: { likerId: userId },
      include: [
        { model: User, as: 'Liked' }
      ]
    });
    res.json(likedProfiles);
  } catch (err) {
    res.status(500).send(err);
  }
};

