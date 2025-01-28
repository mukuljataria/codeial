// Client side file

class ChatEngine {
    constructor(chatBoxId, userEmail){
        console.log("Constructor Initiated")
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');  // io is the global variable available to us as soon as we add socket.io cdn js script
        // io.connect triggers the connection which will be connected on server side
        if (this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets....!')

            self.socket.emit('join_room', {
                userEmail: self.userEmail,
                chatroom: 'codegram',
            })

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })
        })
    }
}
