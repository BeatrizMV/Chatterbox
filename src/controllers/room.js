const rooms = require("../models/rooms");
const config = require("../config");
const userHelper = require("../helpers/user");

const getRooms = async (_, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify(rooms));
};

const getRoom = async (req, res) => {
  const reqURL = new URL(`http://${config.hostname}${req.url}`);

  const roomId = reqURL.searchParams.get("roomId");

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
      if (userHelper.checkIfUserExists(user)) {
        userIDs.push(userHelper.getUserId(user));
      } else {
        res.statusCode = 404;
        res.end("Some of the users doesn't exists");
      }
    });

  const roomId = rooms.push({ users: userIDs, name });

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
    if (userHelper.checkIfUserExists(email)) {
      rooms[roomId].users.push(userHelper.getUserId(email));
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

module.exports = { getRooms, getRoom, createRoom, addUserToRoom };
