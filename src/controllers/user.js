const { userModel } = require("../models/index");
const config = require("../config");
const userHelper = require("../helpers/userHelper");

const checkLogin = (req, res) => {
  const reqURL = new URL(`http://${config.hostname}${req.url}`);

  const email = reqURL.searchParams.get("email");
  const password = reqURL.searchParams.get("password");

  const user = userHelper.getUserFromEmail(email);

  if (user && user.password === password) {
    res.statusCode = 200;
    res.end("User logged correctly");
  } else {
    res.statusCode = 404;
    res.end("The user or the password are not correct");
  }
};

const register = (req, res) => {
  const { email } = req.body;
  const isAdded = !userHelper.checkIfUserExists(email) && userModel.push(email);
  if (isAdded) {
    res.statusCode = 201;
    res.end("User added");
  } else {
    res.statusCode = 404;
    res.end("User already exists");
  }
};

const getUsers = (_, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(userModel));
};

module.exports = { checkLogin, register, getUsers };
