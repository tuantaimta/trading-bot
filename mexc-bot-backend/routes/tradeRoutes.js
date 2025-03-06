const express = require("express");
const router = express.Router();
const { createOrder, sellOrder } = require("../controllers/tradeController");

router.post("/trade", createOrder);
router.post("/sell",sellOrder);
module.exports = router;
