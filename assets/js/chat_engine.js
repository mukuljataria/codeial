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
                user_email: self.userEmail,
                chatroom: 'codegram',
            })

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })
        })

        //* CHANGE:: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
    
            if(msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codegram',
                })
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }))

            newMessage.append($('<sub>',{
                'html': data.user_email
            }))

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
            
        })
    }
}
