const express = require("express");
const Router = express.Router();
// const UserController = require("../Controllers/UserController");
const AuthController = require("../Controllers/AuthController");

Router.post("/register", AuthController.register);
Router.get("/logIn", AuthController.logIn);
// Router.put("/update", UserController.updateUser);
// Router.delete("/delete", UserController.deleteUser);
// Router.get("/get", UserController.getUser);

module.exports = Router;