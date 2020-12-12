import webStorage from "./webstorage.js";
import { drag, drop, allowDrop } from "./userdd.js";

$(document).ready(function () {
  getRooms();
  getUsers();
  document.getElementById("crea-sala").addEventListener("click", function () {
    newRoom();
  });
});

const baseURL = "http://localhost:3000/";

const getRooms = async () => {
  const url = new URL(`${baseURL}rooms`);
  const result = await fetch(url);

  if (result.status === 200) {
    const rooms = await result.json();

    rooms.forEach((room) => {
      appendRoom(room);
    });

    webStorage.saveRooms(rooms);
  }
};

const getUsers = async () => {
  const url = new URL(`${baseURL}users`);
  const result = await fetch(url);

  if (result.status === 200) {
    const users = await result.json();
    const actualUser = webStorage.getUser();

    users.forEach((user) => {
      if (user.email === actualUser) appendUser(user.email);
    });
  }
};

const newRoom = async () => {
  const name = document.getElementById("buscasala").value;
  const roomCreator = sessionStorage.getItem("email");

  if (name) {
    const url = new URL(`${baseURL}room`);

    const result = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (result.status === 201) {
      const room = await result.json();
      webStorage.saveRoom(name, roomCreator);
      appendRoom(room);
    }
  } else {
    alert("Por favor, rellena el nombre de la sala");
  }
};

const appendRoom = (data) => {
  const roomsContainer = document.getElementById("chat-list");
  const node = document.createElement("LI");
  node.className = "list-group-item";
  const textNode = document.createElement("P");
  const text = document.createTextNode(data.name);
  textNode.className = "card_text";
  textNode.appendChild(text);

  textNode.id = data.name;
  // funcion drop definida en userdd.js
  textNode.ondrop = drop;
  // funcion allowdrop definida en userdd.js
  textNode.ondragover = allowDrop;

  node.appendChild(textNode);
  roomsContainer.appendChild(node);
};

const appendUser = (data) => {
  const container = document.getElementById("users");
  const node = document.createElement("LI");
  node.className = "list-group-item";
  const textNode = document.createElement("P");
  const text = document.createTextNode(data);
  textNode.className = "card_text";
  textNode.appendChild(text);

  textNode.id = data;
  textNode.draggable = "true";
  // funcion drag definida en userdd.js
  textNode.ondragstart = drag;

  node.appendChild(textNode);
  container.appendChild(node);
};

const saveUserInRoom = async (id, email) => {
  const url = new URL(`${baseURL}addUserToRoom`);

  const result = await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomId: id,
      email: email,
    }),
  });

  if (result.status === 404) {
    alert("El usuario no se ha podido añadir correctamente a la sala");
  }
};

const isUserAllowedInRoom = async (id, email) => {
  const url = new URL("http://localhost:3000/is-user-allowed");
  url.searchParams.append("id", id);
  url.searchParams.append("email", email);
  const result = await fetch(url);

  if (result.status === 200) {
    return true;
  }

  if (result.status === 403) {
    console.log("The user is not allowed to log into the room");
    return false;
  }

  if (result.status === 404) {
    console.log("There was an error in the request. No room with id " + id);
    return false;
  }
};

const redirectToRoom = async (roomId) => {
  // Hacer esto cuando estemos en chat.html para poder pintar los datos?
  const url = new URL(`${baseURL}room/${roomId}`);

  const result = await fetch(url);

  webStorage.connectedRoom(roomId);

  if (result.status === 200) {
    window.location.replace("/chat.html");
  }
};

export default {
  saveUserInRoom,
  redirectToRoom,
  isUserAllowedInRoom,
};
