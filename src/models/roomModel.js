// const rooms = [
//   { users: [], name: "Main room", messages: [], blockedUsers: [] },
// ];
//
// module.exports = rooms;

const mongoose = require("mongoose");
const userModel = require("./userModel");
const { Schema } = mongoose;

const rooms = new Schema({
  users: [
    // type: Schema.Types.ObjectId, ref: 'User' ,required: true
    userModel.schema,
  ],
  name: String,
  messages: [String],
  blockedUsers: [String],
});

const Room = mongoose.model("Room", rooms);

const getAllRooms = async () => {
  return Room.find({}, (err, foundRooms) => {
    if (err) {
      console.log(err);
    } else {
      return foundRooms;
    }
  });
};

const addUserEmailForRoom = async (roomObj, email) => {
  const { name } = roomObj;
  const room = await Room.find({ name: name }, (err, foundRoom) => {
    if (err) {
      console.log(err);
    } else {
      return foundRoom;
    }
  });
  if (room && !room.users.includes(email)) {
    room.users.push(email);
  }
};

const addNewRoom = async (nuRoom) => {
  const createdRoom = new Room(nuRoom);
  createdRoom.save((err, savedUser) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Room saved");
      // the id is the same as the length
      return nuRoom;
    }
  });
};

const updateRoom = async (room) => {
  const { name } = room;
  const roomFromDb = await Room.find({ name: name }, (err, foundRoom) => {
    if (err) {
      console.log(err);
    } else {
      return foundRoom;
    }
  });
  roomFromDb.users = room.users;
  roomFromDb.name = room.name;
  roomFromDb.blockedUsers = room.blockedUsers;
  roomFromDb.save((err, savedRoom) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Room updated");
      return savedRoom;
    }
  });
};

module.exports = {
  Room,
  getAllRooms,
  addUserEmailForRoom,
  addNewRoom,
  updateRoom,
};
