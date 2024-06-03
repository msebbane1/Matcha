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

  io.on('connection', (socket) => {
    //socket.id ??
    const userId = socket.handshake.query.userId;
  
    console.log(`[SOCKET] User ${userId} connected.`);

    
    // Envoyer un msg test
    socket.emit('welcome', `Welcome to the WebSocket server, User ${userId}!`);


    let disconnected = false; // Variable pour suivre l'état de la déconnexion

    // Gérer la déconnexion d'un utilisateur
    socket.on('disconnect', async () => {
        console.log('Utilisateur déconnecté:', userId);
        
        if (!disconnected) {
            try {
                await User.update({ status: false }, { where: { id: userId }});
                
                
                io.emit('userDisconnected', `User ${userId} s'est déconnecté`);
                console.log(`[SOCKET] User ${userId} disconnected.`);
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut de l\'utilisateur:', error);
            }
        }
        
        disconnected = true;
    });
  
  });

httpsServer.listen(8080, () => {
    console.log('Server running on port 8080');
});
