const { userModel } = require("../models");

const getUserFromEmail = (email) => {
  return userModel.find((user) => user.email === email);
};

module.exports = { getUserFromEmail };
