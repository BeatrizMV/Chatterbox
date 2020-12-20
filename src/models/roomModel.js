// const rooms = [
//   { users: [], name: "Main room", messages: [], blockedUsers: [] },
// ];
//
// module.exports = rooms;

const mongoose = require("mongoose");
// const userModel = require("./userModel");
const { Schema } = mongoose;

const rooms = new Schema({
  // users: [
  //   // type: Schema.Types.ObjectId, ref: 'User' ,required: true
  //   userModel.schema,
  // ],
  users: [String],
  name: { type: String, unique: true },
  messages: [String],
  blockedUsers: [String],
  roomCreator: String,
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
  const room = await Room.findOne({ name: name }, (err, foundRoom) => {
    if (err) {
      console.log(err);
    } else {
      return foundRoom;
    }
  });
  if (room && !room.users.includes(email)) {
    room.users.push(email);
    try {
      await room.save();
    } catch (err) {
      console.log(err);
      return false;
    }
    console.log(`Saved room ${room.name} with email ${email}`);
    return true;
  }
  console.log("User already in the room");
  return false;
};

const addNewRoom = async (nuRoom) => {
  const createdRoom = new Room(nuRoom);
  let success = false;
  await createdRoom.save((err, savedRoom) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Room saved");
      success = true;
    }
  });
  return success ? nuRoom : null;
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

const resetRooms = async () => {
  console.log("Resetting the rooms...");
  const rooms = await Room.find({});
  rooms.forEach((r) => {
    r.users = [];
    r.blockedUsers = [];
    r.save();
  });
};

const removeUserFromAllRooms = async (email) => {
  console.log(`Removing user ${email} from all rooms`);
  const rooms = await Room.find({});
  rooms.forEach((r) => {
    if (r.users.includes(email)) {
      // include only the ones that are different to the email
      r.users = r.users.filter(function (item) {
        return item !== email;
      });
      r.save();
    }
  });
};

module.exports = {
  Room,
  getAllRooms,
  addUserEmailForRoom,
  addNewRoom,
  updateRoom,
  resetRooms,
  removeUserFromAllRooms,
};
