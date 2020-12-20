import webStorage from "./webstorage.js";
import {
  isUserAllowedInRoom,
  redirectToRoom,
  saveUserInRoom,
} from "./roomsUtil.js";

function getSelectedRoomId(roomName) {
  const rooms = webStorage.getRooms();
  for (let i = 0; i < rooms.length; i++) {
    const r = rooms[i];
    if (r.name === roomName) {
      return i;
    }
  }
  return null;
}

async function drop(ev) {
  ev.preventDefault();

  const MAX_AMOUNT_OF_USERS = 5;

  const rooms = webStorage.getRooms();

  const roomDropped = ev.target.id;

  const data = ev.dataTransfer.getData("text");

  const roomId = getSelectedRoomId(roomDropped);
  const isUserAllowed = await isUserAllowedInRoom(roomId, data);

  if (isUserAllowed) {
    const updatedRooms = rooms.map((room, index) => {
      if (room.name === roomDropped)
        if (room.users.length < MAX_AMOUNT_OF_USERS) {
          if (!room.users.includes(data)) {
            room.users.push(data);
          }
          ev.target.appendChild(document.getElementById(data));
          saveUserInRoom(index, data);
          redirectToRoom(index);
        } else alert("Hay demasiados usuarios en la sala");
      return room;
    });

    webStorage.saveRooms(updatedRooms);
  } else {
    alert("Este usuario no tiene permitido entrar en la sala");
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

export { drop, allowDrop, drag };
