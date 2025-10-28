const express = require("express");
const Router = express.Router();
const ProductController = require("../Controllers/ProductController");
const AccessPermission = require("../middleware/AccessPermission");
const verifyJWT =  require("../middleware/verifyJWT");

Router.post("/addProduct", AccessPermission, ProductController.addProduct);
Router.delete("/deleteProduct", AccessPermission, ProductController.deleteProduct);
Router.put("/updateProduct/:barCode", AccessPermission, ProductController.updateProduct);
Router.get("/veiwAll", ProductController.veiwAll);
Router.put("/addProdToBasket", verifyJWT, ProductController.addProdToBasket);
Router.delete("/deleteProdFromBasket", verifyJWT, ProductController.deleteProdFromBasket);
Router.put("/plusProdToBasket", verifyJWT, ProductController.plusProdToBasket);
Router.put("/minusProdFromBasket", verifyJWT, ProductController.minusProdFromBasket);
Router.get("/veiwBasket", verifyJWT, ProductController.veiwBasket);
Router.put("/deleteBasket", verifyJWT, ProductController.deleteBasket);
Router.get("/bigProduct/:barCode", ProductController.bigProduct);

module.exports = Router;