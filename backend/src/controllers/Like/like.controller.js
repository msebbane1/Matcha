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
        await Like.create({ likerId, likedId, isLikeClicked: true });
        //incrementer le famerating
        await User.increment(
          { likeCount: 1, fameRating: 1 },
          { where: { id: likedId } }
        );
        socketManager.emitLikeNotification(likerId, likedId);
        res.json({ liked: true });
      }
      else {
        socketManager.emitUnlikeNotification(likerId, likedId);
        await likedProfiles.destroy();
        await User.decrement(
          { likeCount: 1, fameRating: 1 },
          { where: { id: likedId } }
        );
        res.json({ liked: false });
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

exports.getLikes = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error('ID de l\'utilisateur manquant');
    }

    const likes = await Like.findAll({
      where: { likerId: userId },
      attributes: ['likedId', 'isLikeClicked']
    });

    res.json(likes);
  } catch (err) {
    console.error('Error fetching likes:', err);
    res.status(500).json({ message: err.message });
  }
};


exports.checkLikedProfiles = async (req, res) => {
  try {
    const { likerId, likedId } = req.body;
    if (!likerId || !likedId) {
        return res.status(400).send({ message: 'Missing likerId or likedId' });
    }

    const likedProfiles = await Like.findOne({ where: { likerId, likedId }});

    if (likedProfiles) {
      const liked = Like.update({ isLikeClicked: true }, { where: { likerId, likedId }});
      res.json({ liked });
    } else {
      const liked = Like.update({ isLikeClicked: false }, { where: { likerId, likedId }});
      res.json({ liked });
    }                   
} catch (err) {
    console.error('Erreur lors du like :', err);
    res.status(500).json({ message: err.message });
}
};