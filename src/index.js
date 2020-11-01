"use strict";

const http = require("http");

const config = require("./config");

const bodyParser = require("./body-parser");
const router = require("./router");

const server = http.createServer((req, res) => bodyParser(req, res, router));

server.listen(config.port, config.hostname, () => {
  console.log(`Server listening on http://${config.hostname}:${config.port}`); // eslint-disable-line no-console
});
