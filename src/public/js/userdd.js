import webStorage from "./webstorage.js";
import roomsHandler from "./rooms.js";

function drop(ev) {
  ev.preventDefault();

  const MAX_AMOUNT_OF_USERS = 5;

  const rooms = webStorage.getRooms();

  const roomDropped = ev.target.id;

  const data = ev.dataTransfer.getData("text");

  const updatedRooms = rooms.map((room, index) => {
    if (room.name === roomDropped)
      if (room.users.length < MAX_AMOUNT_OF_USERS) {
        room.users.push(data);
        ev.target.appendChild(document.getElementById(data));
        roomsHandler.saveUserInRoom(index, data);
        roomsHandler.redirectToRoom(index);
      } else alert("Hay demasiados usuarios en la sala");
    return room;
  });

  webStorage.saveRooms(updatedRooms);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

export { drop, allowDrop, drag };
