import {
  getRooms,
  getUsers,
  newRoom,
  removeUserFromAllRooms,
} from "./roomsUtil.js";
import webstorage from "./webstorage.js";

$(document).ready(async function () {
  getRooms();
  getUsers();
  const userEmail = webstorage.getUser();
  await removeUserFromAllRooms(userEmail);
  document.getElementById("crea-sala").addEventListener("click", function () {
    newRoom();
  });
});

export default {};
