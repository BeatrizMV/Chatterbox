"use strict";
const http = require('http');
const socketio = require('socket.io');
const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const path = require("path");

const config = require("./config");

const router = require("./router");
const { log } = require('console');

io.on('connection', socket => {
    console.log('new user connected');
})

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "./public")));
app.use(router);

server.listen(config.port, config.hostname, () => {
    console.log(`Server listening on http://${config.hostname}:${config.port}`); // eslint-disable-line no-console
});