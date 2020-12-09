"use strict";

require("./database");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const websocket = require("./websocket");

const path = require("path");

const config = require("./config");

const router = require("./router");

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "./view")));
app.use(router);

app.listen(config.port, config.hostname, () => {
  websocket();
});
