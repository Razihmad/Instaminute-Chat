const socket = io('http://localhost:3000',{ transports : ['websocket'] }) //making connection with the server side to client side

const form = document.getElementById('send-container') //form element
const messageInp = document.getElementById('messageInp') // message input field element
const container = document.querySelector('.container') // container element which show all the message

const username = prompt("Enter Your name To Join") //ask the user his username
const audio = new Audio('ting.mp3') // initializing audio object to play the audio
 
//this function is defined in order to append the elements to container for the different messages
const append = (message,position)=>{
    const messageEle = document.createElement('div')
    messageEle.innerText = message;
    messageEle.classList.add('message');
    messageEle.classList.add(position);
    container.append(messageEle);
    if(position=='left'){
        audio.play()
    }
};

// here we are emmiting the event when a new user joined the chat
socket.emit('new-user-joined',username);

// listening the event which got broadcated when someone joined chat successfully and show the message to other users
socket.on('user-joined',username=>{
append(`${username} has joined the chat`,'right');
})


// form submission and emiiting the send event which tells that a message has been sent
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message)
    messageInp.value = ''
})


// recieved message event listener that gives information about the message and its writer
socket.on('recieve', data =>{

    append(`${data.username}: ${data.message}`,'left')
})

// listern of the event when someone left the chat room
socket.on('left',data =>{
    append(`${data} has left the chat`,'right')
})