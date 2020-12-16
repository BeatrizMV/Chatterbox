const roomModel = require("../models/roomModel");
const userHelper = require("../helpers/userHelper");
const config = require("../config");

const getRooms = async (_, res) => {
  res.statusCode = 200;
  const allRooms = await roomModel.getAllRooms();
  res.end(JSON.stringify(allRooms));
};

const getRoom = async (req, res) => {
  const { roomId } = req.params;

  const allRooms = await roomModel.getAllRooms();

  if (allRooms[roomId]) {
    res.statusCode = 200;
    res.end(JSON.stringify(allRooms[roomId]));
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
  // const allRooms = roomModel.getAllRooms();
  // const roomId = allRooms.push({ users: userIDs, name: name, blockedUsers: [] });
  const savedRoom = roomModel.addNewRoom({
    users: userIDs,
    name: name,
    blockedUsers: [],
  });

  res.statusCode = 201;
  res.end(JSON.stringify(savedRoom));
};

const addUserToRoom = async (req, res) => {
  const { roomId, email } = req.body;

  if ((!roomId && roomId !== 0) || !email) {
    res.statusCode = 404;
    res.end("Request data is not complete");
  }

  const allRooms = await roomModel.getAllRooms();

  if (allRooms[roomId]) {
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

  const allRooms = await roomModel.getAllRooms();

  let roomObj;
  for (const rObj of allRooms) {
    const { name } = rObj;
    if (name === room) {
      roomObj = rObj;
      break;
    }
  }
  roomObj.blockedUsers.push(email);
  roomObj.users = roomObj.users.filter((elem) => {
    return elem !== email;
  });

  await roomModel.updateRoom(roomObj);

  res.statusCode = 201;
  res.json(roomObj);
};

const isUserAllowed = async (req, res) => {
  // const { roomId, email } = req.body;
  const reqURL = new URL(`http://${config.hostname}${req.url}`);

  const roomId = reqURL.searchParams.get("id");
  const email = reqURL.searchParams.get("email");

  const allRooms = await roomModel.getAllRooms();

  if (roomId < allRooms.length && allRooms[roomId]) {
    if (allRooms[roomId].blockedUsers.includes(email)) {
      res.statusCode = 403;
      res.end("The user is in the blacklist");
    } else {
      res.statusCode = 200;
      res.end("User allowed in the room");
    }
  } else {
    res.statusCode = 404;
    res.end("No room with that id");
  }
};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  addUserToRoom,
  blockUser,
  isUserAllowed,
};
