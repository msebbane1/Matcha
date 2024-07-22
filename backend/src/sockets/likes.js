const User = require('../models/User');


module.exports = (io, socket) => {
  socket.on('likeProfile', ({ likerId, likedId }) => {
      console.log(`Liker ${likerId} a aimé le profil de ${likedId}`);
      
      socket.emit('notification', {
          message: `Vous avez aimé le profil de l'utilisateur ${likedId}`
      });
      // Émission d'une notification à l'utilisateur concerné
      io.emit('notification', {
          message: `Votre profil a été aimé par l'utilisateur ${likerId}`
      });
  });
};
/*
// Fonction pour émettre une notification de like
module.exports.emitLikeNotification = (io, likerId, likedId) => {
  io.emit('notification', {
      message: `Votre profil ${likedId} a été aimé par l'utilisateur ${likerId}`
  });
};*/