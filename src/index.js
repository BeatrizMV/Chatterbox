"use strict";

const http = require("http");

const bodyParser = require("./body-parser");
const router = require("./router");

const server = http.createServer((req, res) => bodyParser(req, res, router));

const hostname = "localhost";
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server listening on http://${hostname}:${port}`); // eslint-disable-line no-console
});
