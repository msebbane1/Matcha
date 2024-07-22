
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
        io.emit('notification', {
            message: `Votre profil ${likedId} a été aimé par l'utilisateur ${likerId}`
        });
    }
};

