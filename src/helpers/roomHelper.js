const roomModel = require("../models/roomModel");
const userHelper = require("../helpers/userHelper");

const addNewConnectedUser = async (email, roomId) => {
  const rooms = await roomModel.getAllRooms();
  if (rooms && rooms[roomId]) {
    const userFromEmail = await userHelper.getUserFromEmail(email);
    const roomObj = rooms[roomId];
    if (userFromEmail) {
      if (
        !roomObj.users.find((user) => {
          return user === email;
        })
      )
        // roomModel[roomId].users.push(userHelper.getUserFromEmail(email).email);
        await roomModel.addUserEmailForRoom(roomObj, userFromEmail.email);
    }
  }
};

module.exports = { addNewConnectedUser };
