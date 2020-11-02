import webStorage from "./webstorage.js";

$(document).ready(function () {
  getRooms();
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

const appendRoom = (room) => {
  const roomsContainer = document.getElementById("chat");
  const node = document.createElement("DIV");
  node.className = "rooms";
  const textNode = document.createElement("P");
  const text = document.createTextNode(room.name);
  textNode.className = "card_text";
  textNode.appendChild(text);
  node.appendChild(textNode);
  roomsContainer.appendChild(node);
};
