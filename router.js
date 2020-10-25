const fs = require("fs");
const path = require("path");

const clientPath = path.join(__dirname, "/../../../client");

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
  if (req.url === "/x") {
  } else if (req.url.includes(".")) {
    serveStatic(req, res);
  } else {
    notFound(res);
  }
};
