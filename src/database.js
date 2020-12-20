const mongoose = require("mongoose");
const roomsModel = require("./models/roomModel");

const uri = "mongodb://127.0.0.1:27017/chatterbox";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.once("open", async (_) => {
  console.log("Database is connected to:", uri);
  await roomsModel.resetRooms();
});

// to test the error stop mongod
db.on("error", (err) => {
  console.log(err);
});
