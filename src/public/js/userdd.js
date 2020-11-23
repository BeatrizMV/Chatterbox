import webStorage from "./webstorage.js";
import roomsController from "./rooms.js";

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
        roomsController.saveUserInRoom(index, data);
      } else alert("Hay demasiados usuarios en la sala");
    return room;
  });

  webStorage.saveRooms(updatedRooms);

  // llamada al endpoint "/addUserRoom" pasandole el numero de sala y el email del usuario
  fetch("/addUserToRoom", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ roomId: roomDropped, email: data }),
  })
    .then(function (res) {
      // en este punto deberiamos de ir a la sala
      console.log(res);
      console.log("User successfully added to the room");
    })
    .catch(function (res) {
      console.log(res);
    });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

export { drop, allowDrop, drag };
