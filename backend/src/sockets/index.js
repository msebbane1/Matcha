//const chatSockets = require('./chat');
const likesSockets = require('./likes');
const statusSockets = require('./status');

module.exports = (io) => {
    io.on('connection', (socket) => {
        
        statusSockets(io, socket);
       // likesSockets(io, socket);
        //chatSockets(io, socket);

        socket.on('disconnect', () => {
        });
    });
};


