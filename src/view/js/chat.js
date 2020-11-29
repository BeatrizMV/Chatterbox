var socket;

function sendMessage(event) {
    //event.preventDefault();
    const msg = document.getElementById("message").value;
    console.log("Sending message to the chat: " + msg);
    document.getElementById("message").value = "";
    socket.emit('message', msg);
    createMsgElemInScreen(msg, true);
}

function submitMessage(event) {
    console.log("from SUBMIT");
    sendMessage(event);
}

function createMsgElemInScreen (msg, isMine){
    //cogemos el contenedor de los mensajes
    const messages = document.getElementById("messages-list");
    //creamos el list item para el mensaje
    const listItem = document.createElement("LI");
    const text = document.createTextNode(msg);
    if(isMine) {
        listItem.className = "message_sent--mine";
    } else {
        listItem.className = "message_sent";
    }
    listItem.appendChild(text);
    messages.appendChild(listItem);
}

$(document).ready(function () {
    console.log("after page loaded");
    socket = io.connect("http://localhost:8000");

    socket.on('message', function(msg){
        console.log("Received message from socket: " + msg);
        createMsgElemInScreen(msg, false);
    });

})