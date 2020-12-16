const roomModel = require("../models/roomModel");
const userHelper = require("../helpers/userHelper");

const addNewConnectedUser = async (email, roomId) => {
  const rooms = await roomModel.getAllRooms();
  if (rooms && rooms[roomId]) {
    if (userHelper.getUserFromEmail(email)) {
      if (
        !rooms[roomId].users.find((user) => {
          return user === email;
        })
      )
        // roomModel[roomId].users.push(userHelper.getUserFromEmail(email).email);
        await roomModel.addUserEmailForRoom(
          rooms[roomId],
          userHelper.getUserFromEmail(email).email
        );
    }
  }
};

module.exports = { addNewConnectedUser };
