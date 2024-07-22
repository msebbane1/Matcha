//const chatSockets = require('./chat');
const likesSockets = require('./likes');
const statusSockets = require('./status');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        
        //chatSockets(io, socket);
        likesSockets(io, socket);
        statusSockets(io, socket);

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};


