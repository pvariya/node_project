const express = require("express");
const {
  getCartByUserId,
  addToCart,
  addQuantity,
  removeQuantity,
  removeFromCart,
} = require("../controllers/cart.controller");
const decoded = require("../middleware/decodeJWT");

const cartRouter = express.Router();

cartRouter.get("/", decoded, getCartByUserId);
cartRouter.post("/", decoded, addToCart);
cartRouter.patch("/add-qty/:cartId", decoded, addQuantity);
cartRouter.patch("/remove-qty/:cartid", decoded, removeQuantity);
cartRouter.delete("/:cartId", decoded, removeFromCart);

module.exports = cartRouter;
