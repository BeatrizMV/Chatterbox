const { users } = require("../models/index");

const checkIfUserExists = (email) => {
  if (users.includes(email)) return true;
  else return false;
};

const getUserId = (email) => {
  return checkIfUserExists(email) ? users.indexOf(email) : -1;
};

module.exports = { checkIfUserExists, getUserId };
