const express = require("express");
const router = express.Router();
const { getPrice } = require("../controllers/priceController");

// Định nghĩa route cho việc lấy giá với một tham số cặp tỉ giá
router.get("/price/:pair", getPrice);

module.exports = router;
