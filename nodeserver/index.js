// This is our node server js file which contain the server side js.

const io  = require('socket.io')(3000) // importing the socket.io to use in this application

const users = {} //to store the users

io.on('connection', socket =>{
    //here we listening an event when a new user joined the chat room
    socket.on('new-user-joined', username =>{
        users[socket.id] = username; //store the username to the users 
        socket.broadcast.emit('user-joined',username); //broadcast to everyone that a new user has joined the room
    });
// listening the event which was emiited when someone send the message
    socket.on('send',message =>{
        // after getting send event we broadcast to the sever that we have recieved the message and let all other person know about it
        socket.broadcast.emit('recieve',{message:message,username:users[socket.id]}) // emit recieve event with message and username with it.
    });
    // In case if a user disconnet it fire an event as disconnect 
    socket.on('disconnect',() =>{
        // when disconnected let all others know who has left the chat
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id] // delete the user that left the chat
    });
})