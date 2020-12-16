// const users = [
//   { email: "bea@gmail.com", password: "1234", name: "Bea" },
//   { email: "eric@gmail.com", password: "1234", name: "Eric" },
// ];
//
// module.exports = users;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  email: String,
  password: String,
  name: String,
});

const User = mongoose.model("User", schema);

const findUserByEmail = async (email) => {
  return User.findOne(
    {
      email: email,
    },
    (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        return foundUser;
      }
    }
  );
};

const getAllUsers = async () => {
  return User.find({}, (err, foundUsers) => {
    if (err) {
      console.log(err);
    } else {
      return foundUsers;
    }
  });
};

const saveUser = async (userObj) => {
  const userDocument = new User(userObj);
  const savedUser = await userDocument.save();
  console.log(`User saved: ${savedUser.email}`);
  return savedUser;
};

module.exports = {
  User,
  schema,
  findUserByEmail,
  getAllUsers,
  saveUser,
};
