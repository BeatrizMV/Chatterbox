const form = document.querySelector(".tab-content");

const getSignInName = document.querySelector("#signin_username");
const getSignInEmail = document.querySelector("#signin_email");

const submitSignInBtn = document.querySelector("#guardar_claves_signin");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

const saveUser = (name, email) => {
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
};

submitSignInBtn.addEventListener("click", function () {
  saveUser(getSignInName.value, getSignInEmail.value);
  // AVATAR
  const inputAvatar = document.querySelector("#avatar");
  const file = inputAvatar.files[0];
  console.log(file);

  const reader = new FileReader();
  reader.onloadend = () => {
    // convert file to base64 String
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    // store file
    localStorage.setItem("avatar", base64String);
  };
  reader.readAsDataURL(file);
});

// SALA
const getRoom = document.querySelector("#buscasala");
const submitSearchRoom = document.querySelector("#localstorageSalas");

if (submitSearchRoom) {
  submitSearchRoom.addEventListener("click", function () {
    localStorage.setItem("name", getRoom.value);
  });
}

export default { saveUser };
