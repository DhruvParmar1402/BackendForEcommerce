const express = require("express");
const { placeOrder, getOrders, getOrderSummary } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/", authMiddleware, getOrders);
router.get("/summary", authMiddleware, getOrderSummary);

module.exports = router;
