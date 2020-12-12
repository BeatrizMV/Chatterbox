// import webStorage from "./webstorage";
let socket;

function sendMessage(event) {
  // event.preventDefault();
  const roomName = getRoomNameFromSessionStorage();
  let canvasData;
  // eslint-disable-next-line no-undef
  if (!isCanvasBlank()) {
    canvasData = document.getElementById("drawing").toDataURL();
  }
  if (canvasData) {
    sendCanvasMessage(canvasData, roomName);
  } else {
    const message = {
      message: document.getElementById("message").value,
      user: sessionStorage.getItem("email"),
      roomName: roomName,
    };
    if (message.message) {
      socket.emit("message", message);
      document.getElementById("message").value = "";
      addMessageToScreen(message, true);
    }
  }
}

function sendCanvasMessage(canvasData, roomName) {
  const message = {
    message: canvasData,
    user: sessionStorage.getItem("email"),
    roomName: roomName,
  };
  if (message.message) {
    socket.emit("canvas-image", message);
    // document.getElementById("message").value = "";
    addCanvasMessageToScreen(message, true);
    // from canvas.js
    // eslint-disable-next-line no-undef
    eraseCanvas();
  }
}

// eslint-disable-next-line no-unused-vars
function submitMessage(event) {
  sendMessage(event);
}

// eslint-disable-next-line no-unused-vars
function navigateToRooms() {
  window.location = "/rooms.html";
}

function addMessageToScreen(message, isMine) {
  // cogemos el contenedor de los mensajes
  const messages = document.getElementById("messages-list");
  // creamos el list item para el mensaje
  const listItem = document.createElement("LI");
  const textNode = document.createElement("P");
  const textNode2 = document.createElement("DIV");
  const text = document.createTextNode(message.message);
  const user = document.createTextNode(message.user);
  if (isMine) {
    listItem.className = "message_sent--mine";
    user.className = "user-chat--mine";
    textNode2.className = "message_sent_user_name--mine";
    textNode.className = "message_sent_inner--mine";

    textNode.appendChild(text);
    // textNode2.appendChild(user);
    textNode2.appendChild(textNode);
    // listItem.appendChild(textNode);
    listItem.appendChild(textNode2);
  } else {
    listItem.className = "message_sent";
    user.className = "user-chat";
    textNode2.className = "message_sent_user_name";
    textNode.className = "message_sent_inner";

    textNode.appendChild(text);
    textNode2.appendChild(user);
    textNode2.appendChild(textNode);
    // listItem.appendChild(textNode);
    listItem.appendChild(textNode2);
  }

  messages.appendChild(listItem);

  // Scroll hasta abajo
  const container = document.getElementById("chat");
  container.scrollTop = container.scrollHeight;
}

function addCanvasMessageToScreen(message, isMine) {
  console.log("Printing canvas message on screen");
  // cogemos el contenedor de los mensajes
  const messages = document.getElementById("messages-list");
  // creamos el list item para el mensaje
  const listItem = document.createElement("LI");
  const imgNode = document.createElement("IMG");
  const textNode2 = document.createElement("DIV");
  const user = document.createTextNode(message.user);
  imgNode.setAttribute("src", message.message);
  if (isMine) {
    listItem.className = "canvas-message_sent--mine";
    // user.className = "user-chat--mine";
    textNode2.className = "message_sent_user_name";
    imgNode.className = "canvas-message_img--mine";

    // textNode2.appendChild(user);
    textNode2.appendChild(imgNode);
    // listItem.appendChild(imgNode);
    listItem.appendChild(textNode2);
  } else {
    listItem.className = "canvas-message_sent";
    // user.className = "user-chat";
    textNode2.className = "message_sent_user_name";
    imgNode.className = "canvas-message_img";

    textNode2.appendChild(user);
    textNode2.appendChild(imgNode);
    // listItem.appendChild(textNode2);
    listItem.appendChild(textNode2);
  }

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
  const actualRoom = sessionStorage.getItem("connectedRoom");

  const usernames = document.getElementById("usernames");
  const node = document.createElement("UL");
  node.className = "user-list";

  // delete the children, so there are no duplicated elements
  if (usernames.firstElementChild) {
    usernames.removeChild(usernames.firstElementChild);
  }

  rooms[actualRoom].users.forEach((user) => {
    const userElement = document.createElement("LI");
    const textNode = document.createElement("P");
    const text = document.createTextNode(user);
    textNode.className = "card_text";
    textNode.appendChild(text);
    userElement.appendChild(textNode);
    node.appendChild(userElement);

    textNode.addEventListener("click", () => {
      console.log("selected user for banning: " + user);
      const blockButton = document.getElementById("block-user-btn");
      // only enable the clicks when the blockButton is visible
      if (blockButton && !blockButton.classList.contains("d-none")) {
        if (textNode.classList.contains("card-text--selected")) {
          textNode.classList.remove("card-text--selected");
          console.log("Removing selection for " + user);
          sessionStorage.setItem("selected-blocking-user", "");
          blockButton.classList.add("disabled");
        } else {
          textNode.classList.add("card-text--selected");
          console.log("Adding selection for " + user);
          sessionStorage.setItem("selected-blocking-user", user);
          blockButton.classList.remove("disabled");
        }
      }
    });
  });
  usernames.appendChild(node);
};

function printBlockedUsers(isAdmin) {
  if (isAdmin) {
    const blockedUserBoxElem = document.getElementById("blocked-userbox");
    blockedUserBoxElem.classList.remove("d-none");

    const rooms = JSON.parse(localStorage.getItem("rooms"));
    const actualRoom = sessionStorage.getItem("connectedRoom");

    const usernames = document.getElementById("blocked-usernames");
    // delete the children, so there are no duplicated elements
    if (usernames.firstElementChild) {
      usernames.removeChild(usernames.firstElementChild);
    }
    const node = document.createElement("UL");
    node.className = "blocked-user-list";

    if (rooms[actualRoom]) {
      rooms[actualRoom].blockedUsers.forEach((user) => {
        const userElement = document.createElement("LI");
        const textNode = document.createElement("P");
        const text = document.createTextNode(user);
        textNode.className = "card_text";
        textNode.appendChild(text);
        userElement.appendChild(textNode);
        node.appendChild(userElement);
      });
      usernames.appendChild(node);
    }
  }
}

function getRoomNameFromSessionStorage() {
  const roomNumber = sessionStorage.getItem("connectedRoom");
  return getRoomName(roomNumber);
}

function getRoomName(roomNumber) {
  // we have the room name in the 'rooms' attribute in sessionstorage, which we can
  // access via the 'connectedRoom' value
  // if we don't find a use for an AJAX request, make this a request in order to
  // at least have a GET implemented
  const roomsFromSessionStorage = localStorage.getItem("rooms");
  const lsRoomsObj = JSON.parse(roomsFromSessionStorage);
  const roomObj = lsRoomsObj[roomNumber];
  return roomObj.name;
}

function replaceRoomName(roomNumber) {
  const roomName = getRoomName(roomNumber);
  const domElem = document.getElementById("room-name");
  domElem.textContent = roomName;
  return roomName;
}

function setAdminVisibilityElems(currentRoomObj, userEmail) {
  const pillDomObj = document.getElementById("admin-pill");
  const blockButton = document.getElementById("block-user-btn");
  const { roomCreator } = currentRoomObj;
  if (roomCreator === userEmail) {
    pillDomObj.classList.remove("d-none");
    blockButton.classList.remove("d-none");
    return true;
  }
  return false;
}

// eslint-disable-next-line no-undef,no-unused-vars
async function addSelectedToBlocked() {
  const selectedUserFromStorage = sessionStorage.getItem(
    "selected-blocking-user"
  );
  const roomName = getRoomNameFromSessionStorage();
  if (selectedUserFromStorage) {
    console.log(
      "Adding the following user to the blocked list: " +
        selectedUserFromStorage
    );
    const url = "/block-user";
    const result = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: selectedUserFromStorage,
        room: roomName,
      }),
    });

    if (result.status === 201) {
      const resp = await result.json();
      const { blockedUsers } = resp;
      console.log(
        "Response from /block-user call. Blocked users: " + blockedUsers
      );
      // update the localstorage and this way re-render the users reading from there
      const roomsAtStorage = JSON.parse(localStorage.getItem("rooms"));
      const roomId = sessionStorage.getItem("connectedRoom");
      roomsAtStorage[roomId] = resp;
      console.log("Updating localstorage to use: " + roomsAtStorage);
      localStorage.setItem("rooms", JSON.stringify(roomsAtStorage));

      // this function is only reached when admin, so pass a true
      printBlockedUsers(true);
      // the list of users needs to be updated too
      printUsers();

      // emit a user blocked event through websockets, so if the user
      // is at the room it they get kicked out
      socket.emit("blocked-user", {
        user: selectedUserFromStorage,
        roomName: roomName,
      });
    } else {
      console.log("Failed to block user " + selectedUserFromStorage);
    }
  } else {
    console.log("No user retrieved from the storage");
  }
}

$(document).ready(function () {
  const data = {
    user: sessionStorage.getItem("email"),
    room: sessionStorage.getItem("connectedRoom"),
  };

  const roomsObj = JSON.parse(localStorage.getItem("rooms"));

  printUsers();

  const roomName = replaceRoomName(data.room);

  const isAdmin = setAdminVisibilityElems(roomsObj[data.room], data.user);
  printBlockedUsers(isAdmin);

  // eslint-disable-next-line no-undef
  socket = io.connect("http://localhost:8000", {
    query: `data=${JSON.stringify(data)}`,
  });

  socket.on("connect", () => {
    socket.emit("room", roomName);
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

  socket.on("message", function (socket, message) {
    addMessageToScreen(message, false);
  });

  socket.on("canvas-image", function (socket, message) {
    console.log("Received canvas image");
    addCanvasMessageToScreen(message, false);
  });

  socket.on("blocked-user", function (socket, message) {
    // eslint-disable-next-line no-use-before-define
    // const {user, roomName} = message;
    const user = message.user;
    const rName = message.roomName;
    console.log("Received blocked user request for user " + message);
    if (user === data.user && roomName === rName) {
      console.log("Current user has been blocked. Redirecting to rooms screen");
      navigateToRooms();
    } else {
      console.log(
        "The user blocked is different from the current one. No changes"
      );
    }
  });
});
