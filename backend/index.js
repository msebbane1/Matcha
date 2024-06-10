const https = require('https');
const fs = require('fs');
const app = require('./src/app');
const socketIo = require('socket.io');
const User = require('./src/models/User')

const privateKey = fs.readFileSync('./nginx/localhost.key', 'utf8');
const certificate = fs.readFileSync('./nginx/localhost.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);


const io = socketIo(httpsServer, {
    cors: {
      origin: "https://localhost:4200",
      methods: ["GET", "POST"]
    }
  });

const connectedUsers = new Set();
const disconnectTimeouts = {};

io.on('connection', (socket) => {
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

    socket.on('disconnect', async () => {
        disconnectTimeouts[userId] = setTimeout(() => {
            connectedUsers.delete(userId);
            console.log(`[SOCKET] User ${userId} disconnected.`);
            //User.update({ status: false }, { where: { id: userId }});
            io.emit('userDisconnected', `User ${userId} is offline`);
            delete disconnectTimeouts[userId];
        }, 4000); 
    });

    // Heartbeat pour vérifier les connexions actives
    setInterval(() => {
        socket.emit('ping');
    }, 30000); // Ping toutes les 30 secondes

    socket.on('pong', () => {
        console.log(`Received pong from ${userId}`);
    });
});
/*
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    console.log(`[SOCKET] User ${userId} connected.`);
    socket.broadcast.emit('userConnected', `User ${userId} s'est connecteeeé`);

    socket.on('disconnect', async () => {
        console.log(`[SOCKET] User ${userId} disconnectedeeee.`);
        io.emit('userDisconnected', `User ${userId} s'est déconnectéeee`);
        console.log(`[SOCKET] User ${userId} disconnecteeeee&&&.`);
    });
});*/

  /*
  // ID de socket user
  io.on('connection', (socket) => {
    console.log('Nouvelle connexion:', socket.id);

    socket.emit('welcome', `Welcome to the WebSocket server, User ${socket.id}!`);
    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté:', socket.id);
        // Émettre un événement pour notifier les clients de la déconnexion
        io.emit('userDisconnected', socket.id);
    });
});*/

httpsServer.listen(8080, () => {
    console.log('Server running on port 8080');
});
