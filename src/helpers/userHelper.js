const { userModel } = require("../models");

const getUserFromEmail = async (email) => {
  // return userModel.find((user) => user.email === email);
  return await userModel.findUserByEmail(email);
};

const checkIfUserExists = async (email) => {
  // return !!userModel.find((user) => user.email === email);
  //   return !! await userModel.findUserByEmail(email);
  const foundUser = await userModel.findUserByEmail(email);
  return !!foundUser;
};

module.exports = { getUserFromEmail, checkIfUserExists };
