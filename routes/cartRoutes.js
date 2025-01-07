const express = require("express");
const { addToCart, viewCart } = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/view", authMiddleware, viewCart);

module.exports = router;
