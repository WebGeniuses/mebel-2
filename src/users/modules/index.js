
const  express = require("express");
const server = express();

const Message = require("./messages/route")
const User = require("./users/route")
server.use(express.json());


server.use(Message)
server.use(User)

module.exports = server;
