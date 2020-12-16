const { userModel } = require("../models/index");
const config = require("../config");
const userHelper = require("../helpers/userHelper");

const checkLogin = async (req, res) => {
  const reqURL = new URL(`http://${config.hostname}${req.url}`);

  const email = reqURL.searchParams.get("email");
  const password = reqURL.searchParams.get("password");

  // const user = await userHelper.getUserFromEmail(email);
  const user = await userModel.findUserByEmail(email);

  if (user && user.password === password) {
    res.statusCode = 200;
    res.end("User logged correctly");
  } else {
    res.statusCode = 404;
    res.end("The user or the password are not correct");
  }
};

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const user = { email, password, name };
  // const isAdded = !userHelper.checkIfUserExists(email) && userModel.push(user);
  const userExist = await userHelper.checkIfUserExists(email);
  const userSaved = await userModel.saveUser(user);
  // const isAdded = !userHelper.checkIfUserExists(email) && userModel.saveUser(user);
  const isAdded = !userExist && !!userSaved;
  if (isAdded) {
    res.statusCode = 201;
    res.end("User added");
  } else {
    res.statusCode = 404;
    res.end("User already exists");
  }
};

const getUsers = async (_, res) => {
  const allUsers = await userModel.getAllUsers();
  res.statusCode = 200;
  res.end(JSON.stringify(allUsers));
};

module.exports = { checkLogin, register, getUsers };
