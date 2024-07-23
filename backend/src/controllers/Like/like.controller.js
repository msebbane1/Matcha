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

      const likedProfiles = await Like.findOne({ where: { likerId, likedId }});

      console.log('Résultat de la requête Like.findOne:', likedProfiles);

      if (!likedProfiles){
        // stocke dans la bd les likes ID
        const like = await Like.create({ likerId, likedId });
        socketManager.emitLikeNotification(likerId, likedId);
        res.json(like);
      }
      else {
        socketManager.emitUnlikeNotification(likerId, likedId);
        await likedProfiles.destroy();
        res.json({ message: 'Unlike user'});
      }
  } catch (err) {
      console.error('Erreur lors du like :', err);
      res.status(500).json({ message: err.message });
  }
};


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


exports.checkLikedProfiles = async (req, res) => {
  try {
    const { likerId, likedId } = req.body;
    if (!likerId || !likedId) {
        return res.status(400).send({ message: 'Missing likerId or likedId' });
    }

    const likedProfiles = await Like.findOne({ where: { likerId, likedId }});

    if (likedProfiles){
      res.json({ message: 'true'});
    }
    else {
      res.json({ message: 'false'});
    }
} catch (err) {
    console.error('Erreur lors du like :', err);
    res.status(500).json({ message: err.message });
}
};

