const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    const cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({ userId, productId, quantity });
    }

    res.json({ message: "Item added to cart." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.find({ userId }).populate("productId");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
