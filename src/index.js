"use strict";

const express = require("express");
const socket = require("socket.io");
const bodyparser = require("body-parser");
const app = express();

const path = require("path");

const config = require("./config");

const router = require("./router")

const WS_PORT = 8000;

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use(router);

app.listen(config.port, config.hostname, () => {
  console.log(`Server listening on http://${config.hostname}:${config.port}`); // eslint-disable-line no-console
});


//Socket setup
var http = require('http');

const server = http.createServer(function (req, res) {
//nothing here
}).listen(WS_PORT);


//const server = app.listen(WS_PORT, function (){
//  console.log("Listening ws on port: " + WS_PORT);
//});

const io = socket(server);

io.on('connection', socket => {
  console.log("Nuevo usuario conectado");
})
