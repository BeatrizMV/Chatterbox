"use strict";

const express = require("express");
const app = express();

const path = require("path");

const config = require("./config");

const router = require("./router");

app.use(express.static(path.join(__dirname, "./public")));
app.use(router);

app.listen(config.port, config.hostname, () => {
  console.log(`Server listening on http://${config.hostname}:${config.port}`); // eslint-disable-line no-console
});
