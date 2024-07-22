const https = require('https');
const fs = require('fs');
const app = require('./src/app');
const socketIo = require('socket.io');
const socketManager = require('./src/socketManager');

// certificats SSL
const privateKey = fs.readFileSync('./nginx/localhost.key', 'utf8');
const certificate = fs.readFileSync('./nginx/localhost.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Creation server https
const httpsServer = https.createServer(credentials, app);

// Initialisation de Socket.io avec cors
/*const io = socketIo(httpsServer, {
  cors: {
    origin: "https://localhost:4200",
    methods: ["GET", "POST"]
  }
});*/

const io = socketManager.init(httpsServer);
// Initialiser les sockets
require('./src/sockets')(io);


httpsServer.listen(8080, () => {
    console.log('Server running on port 8080');
});

//module.exports = io;
//module.exports = { io };
