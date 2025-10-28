const express = require("express");
const Router = express.Router();
const AuthController = require("../Controllers/AuthController");
// const verifyJWT = require("../middleware/verifyJWT");

Router.post("/register", AuthController.register);
Router.post("/logIn", AuthController.logIn);//,verifyJWT

module.exports = Router;