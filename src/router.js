const fs = require("fs");
const path = require("path");
const url = require("url");

const usersController = require("./controllers/user");
const roomsController = require("./controllers/room");
const config = require("./config");

const clientPath = path.join(__dirname, "./public");

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "application/image/svg+xml",
};

function notFound(res) {
  res.statusCode = 404;
  res.end("The requested URL was not found on this server.");
}

function serveStatic(req, res) {
  fs.readFile(clientPath + req.url, (err, data) => {
    if (err) return notFound(res);
    const extname = path.extname(req.url).toLowerCase();
    res.writeHead(200, { "Content-type": mimeTypes[extname] });
    res.end(data);
  });
}

module.exports = function router(req, res) {
  if (req.url === "/") req.url = "/index.html";

  const reqURL = new url.URL(`http://${config.hostname}${req.url}`);

  const path = reqURL.pathname;

  if (path === "/login") {
    if (req.method === "GET") usersController.checkLogin(req, res);
  } else if (path === "/users") {
    if (req.method === "GET") usersController.getUsers(req, res);
  } else if (path === "/register") {
    if (req.method === "POST") usersController.register(req, res);
  } else if (path === "/rooms") {
    if (req.method === "GET") roomsController.getRooms(req, res);
  } else if (path === "/room") {
    if (req.method === "GET") roomsController.getRoom(req, res);
    if (req.method === "POST") roomsController.createRoom(req, res);
  } else if (path === "/addUserToRoom") {
    if (req.method === "POST") roomsController.addUserToRoom(req, res);
  } else if (req.url.includes(".")) {
    serveStatic(req, res);
  } else {
    notFound(res);
  }
};
