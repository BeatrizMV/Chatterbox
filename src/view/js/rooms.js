import {
  getRooms,
  getUsers,
  newRoom,
  removeUserFromAllRooms,
  resetRoomBlock,
} from "./roomsUtil.js";
import webstorage from "./webstorage.js";

$(document).ready(function () {
  const crearSalaBtn = document.getElementById("crea-sala");
  if (crearSalaBtn) {
    crearSalaBtn.addEventListener("click", function (event) {
      console.log("Click on 'crea-sala'");
      event.preventDefault();
      event.stopPropagation();
      newRoom();
      return false;
    });
  }
  const crearSalaForm = document.getElementById("crea-sala-form");
  if (crearSalaForm) {
    crearSalaForm.addEventListener("submit", function (event) {
      console.log("Submit on 'crea-sala'");
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
  }

  const refreshBtn = document.getElementById("rooms-refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", function (event) {
      console.log("Refreshing the list of rooms");
      event.preventDefault();
      event.stopPropagation();
      resetRoomBlock();
      getRooms();
      return false;
    });
  }

  getRooms();
  getUsers();
  const userEmail = webstorage.getUser();
  removeUserFromAllRooms(userEmail);
});

export default {};
