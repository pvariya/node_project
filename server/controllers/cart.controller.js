const Cart = require("../models/cart.Schema");

const getCartByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    let cart = (await Cart.create({ userId: userId })).populate("Product");
    //   console.log();
    res.send(cart);
  } catch (error) {
    console.log(error.message);
  }
};

const addToCart = async (req, res) => {
  req.body.user = req.user.id;
  const { user, product } = req.body;
  try {
    let isExist = await Cart.findOne({ user: user, product: product });
    if (isExist) {
      isExist.qty += 1;
      await isExist.save();
      res.send(isExist);
    } else {
      let cart = await Cart.create(req.body);
      res.send(cart);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const removeFromCart = async (req, res) => {
  let { cartId } = req.params;
  try {
    let cart = await Cart.findById(cartId);
    res.send(cart);
  } catch (error) {
    console.log(error.message);
  }
};

const addQuantity = async (req, res) => {
  let { cartId } = req.params;
  try {
    let cart = await Cart.findById(cartId);
    cart.qty += 1;
    await cart.save();
    res.send(cart);
  } catch (error) {
    console.log(error.message);
  }
};

const removeQuantity = async (req, res) => {
  const { cartId } = req.params;
  try {
    let cart = await Cart.findById(cartId);
    if (cart.qty > 1) {
      cart.qty -= 1;
      await cart.save();
      res.send(cart);
    } else {
      cart = await cart.findByIdAndDelete(cartId);
      res.send(cart);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getCartByUserId,
  addQuantity,
  removeQuantity,
  addToCart,
  removeFromCart,
};
