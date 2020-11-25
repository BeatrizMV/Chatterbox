const { userModel } = require("../models");
const { users } = require("../models/rooms");

const checkIfUserExists = (email) => {
  return userModel.find((user) => user.email === email);
};

const getUserId = (email) => {
  return checkIfUserExists(email) ? users.indexOf(email) : -1;
};

module.exports = { checkIfUserExists, getUserId };
