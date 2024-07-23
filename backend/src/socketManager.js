const socketIo = require('socket.io');

let io;

module.exports = {
    init: (server) => {
        io = socketIo(server, {
            cors: {
                origin: "https://localhost:4200",
                methods: ["GET", "POST"]
            }
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        return io;
    },
    emitLikeNotification: (likerId, likedId) => {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        io.to(likedId.toString()).emit('notification', {
          message: `Votre profil (${likedId}) a été liké par l'utilisateur ${likerId}`
        });
        io.to(likerId.toString()).emit('notification', {
          message: `Tu a liké l'utilisateur ${likedId}`
        });
    },
    emitUnlikeNotification: (likerId, likedId) => {
      if (!io) {
          throw new Error("Socket.io not initialized!");
      }
      io.to(likedId.toString()).emit('notification', {
        message: `Votre profil a été unlike par l'utilisateur ${likerId}`
      });
      io.to(likerId.toString()).emit('notification', {
        message: `Tu a unlike l'utilisateur ${likedId}`
      });
  }
};

