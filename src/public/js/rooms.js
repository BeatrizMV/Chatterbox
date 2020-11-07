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
      webStorage.saveRoom(room.name);
    });
  }
};

const getUsers = async () => {
  const url = new URL(`${baseURL}users`);
  const result = await fetch(url);

  if (result.status === 200) {
    const users = await result.json();
    const actualUser = webStorage.getUser();

    users.forEach((user) => {
      if (user !== actualUser) appendUser(user);
    });
  }
};

const newRoom = async () => {
  const name = document.getElementById("buscasala").value;

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
      webStorage.saveRoom(name);
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
  console.log(data);
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
