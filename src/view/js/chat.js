let socket;

function sendMessage(event) {
  // event.preventDefault();
  const message = {
    message: document.getElementById("message").value,
    user: localStorage.getItem("email"),
  };
  document.getElementById("message").value = "";
  socket.emit("message", message);
  addMessageToScreen(message, true);
}

// eslint-disable-next-line no-unused-vars
function submitMessage(event) {
  sendMessage(event);
}

function addMessageToScreen(message, isMine) {
  // cogemos el contenedor de los mensajes
  const messages = document.getElementById("messages-list");
  // creamos el list item para el mensaje
  const listItem = document.createElement("LI");
  const text = document.createTextNode(message.message);
  if (isMine) {
    listItem.className = "message_sent--mine";
  } else {
    listItem.className = "message_sent";
  }
  listItem.appendChild(text);
  messages.appendChild(listItem);

  // Scroll hasta abajo
  const container = document.getElementById("chat");
  container.scrollTop = container.scrollHeight;
}

const baseURL = "http://localhost:3000/";

const cleanUsers = () => {
  const usernames = document.getElementById("usernames");
  usernames.removeChild(usernames.lastElementChild);
};

const printUsers = () => {
  const rooms = JSON.parse(localStorage.getItem("rooms"));
  const actualRoom = localStorage.getItem("connectedRoom");

  const usernames = document.getElementById("usernames");
  const node = document.createElement("UL");
  node.className = "user-list";

  rooms[actualRoom].users.forEach((user) => {
    const userElement = document.createElement("LI");
    const textNode = document.createElement("P");
    const text = document.createTextNode(user);
    textNode.className = "card_text";
    textNode.appendChild(text);
    userElement.appendChild(textNode);
    node.appendChild(userElement);
  });
  usernames.appendChild(node);
};

$(document).ready(function () {
  const data = {
    user: localStorage.getItem("email"),
    room: localStorage.getItem("connectedRoom"),
  };

  printUsers();

  // eslint-disable-next-line no-undef
  socket = io.connect("http://localhost:8000", {
    query: `data=${JSON.stringify(data)}`,
  });

  socket.on("newUserConnected", async () => {
    const url = new URL(`${baseURL}rooms`);
    const result = await fetch(url);

    if (result.status === 200) {
      const rooms = await result.json();

      // eslint-disable-next-line no-undef
      localStorage.setItem("rooms", JSON.stringify(rooms));

      cleanUsers();
      printUsers();
    }
  });

  socket.on("message", function (message) {
    addMessageToScreen(message, false);
  });
});
