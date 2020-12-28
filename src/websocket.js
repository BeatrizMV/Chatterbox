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

  io.on("connection", async (socket) => {
    const { data } = socket.request._query;

    const { user, room } = JSON.parse(data);

    await addNewConnectedUser(user, room);

    socket.broadcast.emit("newUserConnected");

    socket.on("room", function (data) {
      const { user, room } = data;
      console.log(`room message received for room ${room} and user ${user}`);
      // Give a name to the socket for this user. We should identify the
      // disconnections this way
      socket.userName = user;
      socket.join(room);
    });

    socket.on("message", (message) => {
      // Mandamos el mensaje a todos los usuarios a la escucha
      // socket.broadcast.emit("message", message);
      const { roomName } = message;
      if (roomName) {
        console.log("Sending message to room: " + roomName);
        console.log("Message content: " + JSON.stringify(message));
        socket.to(roomName).emit("message", socket.id, message);
      }
    });

    socket.on("canvas-image", (message) => {
      // Mandamos el mensaje a todos los usuarios a la escucha
      // socket.broadcast.emit("message", message);
      const { roomName } = message;
      if (roomName) {
        console.log("Sending message to room: " + roomName);
        console.log("Message content: " + JSON.stringify(message));
        socket.to(roomName).emit("canvas-image", socket.id, message);
      }
    });

    socket.on("blocked-user", (message) => {
      const { roomName, user } = message;
      console.log(
        `'blocked-user' event received. Blocking for: ${user} at ${roomName}`
      );
      // socket.to(roomName).emit("blocked-user", socket.id, message);
      socket.broadcast.emit("blocked-user", socket.id, message);
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.userName} disconnected`);
    });

    socket.on("client-exit", (message) => {
      const { roomName } = message;
      // socket.to(roomName).emit("blocked-user", socket.id, roomName);
      console.log(`'client-exit' event received for room: ${roomName}`);
      socket.broadcast.emit("client-exit", socket.id, roomName);
    });
  });
};
