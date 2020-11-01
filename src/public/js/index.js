import webStorage from "./webstorage";

$(document).ready(function () {
  $("ul.switcher li").click(function () {
    const tabId = $(this).attr("data-tab");

    $("li").removeClass("active");

    $("div.tab-pane").removeClass("active");

    $(this).addClass("active");
    $("#" + tabId).addClass("active");
  });

  document
    .getElementById("guardar_claves_login")
    .addEventListener("click", function () {
      login();
    });

  document
    .getElementById("guardar_claves_signin")
    .addEventListener("click", function () {
      register();
    });
});

const baseURL = "hhtp://localhost:3000/";

const login = async () => {
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  const url = new URL(`${baseURL}login`);
  const params = { email, password };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const result = await fetch(url);
  console.log(result);

  // Check if result is ok
  // if(result) call localStorage
  // Show an error
  webStorage.saveUser(name, email);
};

const register = async () => {
  const email = document.getElementById("signin_email").value;
  const password = document.getElementById("signin_password").value;
  // Photo is not saved for now

  const url = new URL(`${baseURL}register`);

  const result = await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  console.log(result);

  // Check if result is ok
  // If result is ok // Redirect to the chat rooms? Redirect to the login page?
  // And save the data in Localstorage
  // If result is not ok?
  webStorage.saveUser(name, email);
};
