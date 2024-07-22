const User = require('../models/User');

const connectedUsers = new Set();
const disconnectTimeouts = {};

module.exports = (io, socket) => {
    const userId = socket.handshake.query.userId;

    // Annule la déconnexion si l'user se reconnecte rapidement
    if (disconnectTimeouts[userId]) {
        clearTimeout(disconnectTimeouts[userId]);
        delete disconnectTimeouts[userId];
    }

    if (!connectedUsers.has(userId)) {
        connectedUsers.add(userId);
        console.log(`[SOCKET] User ${userId} connected.`);
        User.update({ status: true }, { where: { id: userId }});
        socket.broadcast.emit('userConnected', `User ${userId} is online`);
    }

    socket.on('disconnect', () => {
        disconnectTimeouts[userId] = setTimeout(() => {
            connectedUsers.delete(userId);
            console.log(`[SOCKET] User ${userId} disconnected.`);
            User.update({ status: false }, { where: { id: userId }});
            io.emit('userDisconnected', `User ${userId} is offline`);
            delete disconnectTimeouts[userId];
        }, 4000); 
    });

    // Heartbeat pour vérifier les connexions actives
    const heartbeatInterval = setInterval(() => {
        socket.emit('ping');
    }, 30000); // Ping toutes les 30 secondes

    socket.on('pong', () => {
        console.log(`Received pong from ${userId}`);
    });

    // Nettoyer l'intervalle de heartbeat à la déconnexion
    socket.on('disconnect', () => {
        clearInterval(heartbeatInterval);
    });
};
