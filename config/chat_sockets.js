// Server side file(observing(server) the subscriber(user))

module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){
        console.log('New Connection Recieved', socket.id);
        
        socket.on('disconnect', function(){
            console.log('Socket Disconnected!!');
        });
    });
}