const users = require("../models/index").users;
const config = require("../config");

const checkLogin = (req, res) => {
  const reqURL = new URL(`http://${config.hostname}${req.url}`);
  const email = reqURL.searchParams.get("email");
  if (users.includes(email)) {
    res.statusCode = 200;
    res.end("Ok");
  } else {
    res.statusCode = 404;
    res.end("Not ok");
  }
};

const register = (req, res) => {
  const { email } = req.body;
  const isAdded = !users.includes(email) && users.push(email);
  if (isAdded) {
    res.statusCode = 200;
    res.end("User added");
  } else {
    res.statusCode = 404;
    res.end("User already exists");
  }
};

module.exports = { checkLogin, register };
