const fs = require("fs");
const path = require("path");
const url = require("url");

const loginController = require("./controllers/login");
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
    if (req.method === "GET") loginController.checkLogin(req, res);
  } else if (path === "/register") {
    if (req.method === "POST") loginController.register(req, res);
  } else if (req.url.includes(".")) {
    serveStatic(req, res);
  } else {
    notFound(res);
  }
};
