const http = require("http");
const socket = require("socket.io");
const config = require("./config");

const { addNewConnectedUser } = require("./helpers/roomHelper");

module.exports = function () {
  const server = http
    .createServer()
    .listen(config.webservicePort, config.hostname);

  const io = socket(server, { cors: { origin: "*" } });

  module.exports = io;

  io.on("connection", (socket) => {
    const { data } = socket.request._query;

    const { user, room } = JSON.parse(data);

    addNewConnectedUser(user, room);

    socket.broadcast.emit("newUserConnected");

    socket.on("room", function (room) {
      console.log("room message received: " + room);
      socket.join(room);
    });

    socket.on("message", (message) => {
      // Mandamos el mensaje a todos los usuarios a la escucha
      // socket.broadcast.emit("message", message);
      const { roomName } = message;
      if (roomName) {
        console.log("Sending message to room: " + roomName);
        socket.to(roomName).emit("message", socket.id, message);
      }
    });
  });
};
