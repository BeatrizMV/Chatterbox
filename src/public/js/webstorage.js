const form = document.querySelector(".tab-content");

form &&
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });

const saveUser = (name, email) => {
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
};

const registerUser = (name, email) => {
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
      localStorage.setItem("avatar", base64String);
    };
    reader.readAsDataURL(file);
  }
};

const saveRoom = (name) => {
  localStorage.setItem("roomName", name);
};

const getUser = () => {
  return localStorage.getItem("email");
};

export default { saveUser, registerUser, saveRoom, getUser };
