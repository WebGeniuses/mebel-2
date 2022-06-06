const express =  require("express");
const server = express();

const Admin = require("./admin/route");
const Photo = require("./uploads/route");
const Product = require("./products/route");
const Login = require("./login/route")
server.use(express.json());

server.use(Admin);
server.use(Photo);
server.use(Product);
server.use(Login)

module.exports = server