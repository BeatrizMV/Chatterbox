const rooms = require("../models/roomModel");
const userHelper = require("../helpers/userHelper");

const getRooms = async (_, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(rooms));
};

const getRoom = async (req, res) => {
  const { roomId } = req.params;

  if (rooms[roomId]) {
    res.statusCode = 200;
    res.end(JSON.stringify(rooms[roomId]));
  } else {
    res.statusCode = 404;
    res.end("The room doesn't exist");
  }
};

const createRoom = async (req, res) => {
  const { users, name } = req.body;

  const userIDs = [];

  if (users)
    users.forEach((user) => {
      if (userHelper.getUserFromEmail(user)) {
        userIDs.push(userHelper.getUserFromEmail(user));
      } else {
        res.statusCode = 404;
        res.end("Some of the users doesn't exists");
      }
    });

  const roomId = rooms.push({ users: userIDs, name: name, blockedUsers: [] });

  res.statusCode = 201;
  res.end(JSON.stringify(rooms[roomId - 1]));
};

const addUserToRoom = async (req, res) => {
  const { roomId, email } = req.body;

  if ((!roomId && roomId !== 0) || !email) {
    res.statusCode = 404;
    res.end("Request data is not complete");
  }

  if (rooms[roomId]) {
    if (userHelper.getUserFromEmail(email)) {
      res.statusCode = 201;
      res.end("User added to the room");
    } else {
      res.statusCode = 404;
      res.end("The user doesn't exists");
    }
  } else {
    res.statusCode = 404;
    res.end("The room doesn't exists");
  }
};

const blockUser = async (req, res) => {
  const { email, room } = req.body;
  console.log(`Blocking user ${email} at room ${room}`);
  let roomObj;
  for (const rObj of rooms) {
    const { name } = rObj;
    if (name === room) {
      roomObj = rObj;
      break;
    }
  }
  roomObj.blockedUsers.push(email);
  res.statusCode = 201;
  res.json(roomObj);
};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  addUserToRoom,
  blockUser,
};
