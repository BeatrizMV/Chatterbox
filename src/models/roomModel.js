const rooms = [
  { users: [], name: "Main room", messages: [], blockedUsers: [] },
];

module.exports = rooms;

/*

const mongoose = require("mongoose");
const { Schema } = mongoose;

const rooms = new Schema(
  {
    users: {
      type: Schema.Types.ObjectId, ref: 'User' ,required: true
    },
    name: {
      type: String,
      unique: true,
    },
    messages: {
      type: String
    },
    blockedUsers: {
      type: String,
      unique: true,
    }

  }
);


module.exports = mongoose.model("Room", rooms);

*/
