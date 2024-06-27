// src/Socket.js
const { Server } = require('socket.io');

class SocketServer {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "https://localhost:4200",
        methods: ["GET", "POST"]
      }
    });

    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('likeProfile', ({ likerId, likedId }) => {
        console.log(`Liker ${likerId} a aimé le profil de ${likedId}`);

        // Notify the liker and liked users
        socket.emit('notification', {
          message: `Vous avez aimé le profil de l'utilisateur ${likedId}`
        });

        this.io.emit('notification', {
          message: `Votre profil a été aimé par l'utilisateur ${likerId}`
        });
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  emitLikeNotification(likerId, likedId) {
    this.io.emit('notification', {
      message: `Votre profil ${likedId} a été aimé par l'utilisateur ${likerId}`
    });
  }
}

module.exports = SocketServer;
