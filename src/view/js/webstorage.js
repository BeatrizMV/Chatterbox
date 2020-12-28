const form = document.querySelector(".tab-content");

form &&
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });

const saveUser = (name, email) => {
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("email", email);
};

const connectedRoom = (roomId) => {
  sessionStorage.setItem("connectedRoom", roomId);
};

const getConnectedRoomName = () => {
  const roomIdx = sessionStorage.getItem("connectedRoom");
  const allRooms = JSON.parse(localStorage.getItem("rooms"));
  if (allRooms && allRooms.length > 0) {
    return allRooms[roomIdx].name;
  }
  return null;
};

const registerUser = () => {
  const getSignInName = document.querySelector("#signin_username");
  const getSignInEmail = document.querySelector("#signin_email");

  saveUser(getSignInName.value, getSignInEmail.value);
  // AVATAR
  const inputAvatar = document.querySelector("#avatar");

  let file;
  if (inputAvatar) {
    file = inputAvatar.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      // convert file to base64 String
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      // store file
      sessionStorage.setItem("avatar", base64String);
    };
    reader.readAsDataURL(file);
  }
};

const saveRooms = (data) => {
  localStorage.setItem("rooms", JSON.stringify(data));
};

const getRooms = () => {
  return JSON.parse(localStorage.getItem("rooms"));
};

const saveRoom = (data, roomCreator) => {
  const rooms = getRooms();
  const objToSave = {
    users: [],
    name: data,
    messages: [],
    blockedUsers: [],
    roomCreator: roomCreator,
  };
  rooms.push(objToSave);
  saveRooms(rooms);
};

const getUser = () => {
  return sessionStorage.getItem("email");
};

export default {
  saveUser,
  registerUser,
  saveRooms,
  getRooms,
  getUser,
  connectedRoom,
  saveRoom,
  getConnectedRoomName,
};
