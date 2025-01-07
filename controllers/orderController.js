const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    
    const cartItems = await Cart.find({ userId }).populate("productId");
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    
    let totalAmount = 0;
    const products = cartItems.map((item) => {
      totalAmount += item.productId.price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
      };
    });

    
    const order = new Order({ userId, products, totalAmount });
    await order.save();

    
    await Cart.deleteMany({ userId });

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ userId }).populate("products.productId");

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.aggregate([
      { $match: { userId: userId } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$userId",
          totalProducts: { $sum: "$products.quantity" },
          totalOrders: { $sum: 1 },
          totalValue: { $sum: "$totalAmount" },
        },
      },
    ]);

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json(orders[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
