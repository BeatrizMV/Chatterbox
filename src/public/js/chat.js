function sendMessage(event) {
    //event.preventDefault();
    const msg = document.getElementById("message").value;
    console.log("Sending message to the chat: " + msg);
    document.getElementById("message").value = "";
}

function submitMessage(event) {
    console.log("from SUBMIT");
    sendMessage(event);
}

$(document).ready(function () {
    console.log("after page loaded");
    //var socket = io.connect("http://localhost:3000");
    var socket = io.connect("http://localhost:8000");
})