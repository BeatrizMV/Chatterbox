const users = [
  { email: "bea@gmail.com", password: "1234", name: "Bea" },
  { email: "eric@gmail.com", password: "1234", name: "Eric" },
];

module.exports = users;

/*
  
  
const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
    }
  }
)


module.exports = mongoose.model('User', users);

*/
