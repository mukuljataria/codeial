// Server side file(observing(server) the subscriber(user))

module.exports.chatSockets = function(socketServer){
    // let io = require('socket.io')(socketServer);
    const io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            credentials: true
        },
        allowEIO3: true // Enable compatibility with Socket.IO version 3 clients
    });

    io.sockets.on('connection', function(socket){
        console.log('New Connection Recieved', socket.id);
        
        socket.on('disconnect', function(){
            console.log('Socket Disconnected!!');
        });

        socket.on('join_room', function(data){
            console.log('joining request recieved', data);

            socket.join(data.chatroom)

            io.in(data.chatroom).emit('user_joined', data);
        })
    });
}

