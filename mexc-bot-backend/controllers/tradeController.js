const { placeOrder, sellOrder } = require("../services/mexcService");
const Order = require("../models/Order");

// Đặt lệnh mua
exports.createOrder = async (req, res) => {
  try {
    const { pair, type, price, amount } = req.body;
    const order = await placeOrder(pair, type, price, amount);

    const newOrder = new Order({
      pair,
      type,
      price,
      amount,
      status: "success"
    });
    await newOrder.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order failed", error });
  }
};

// Khớp lệnh bán tự động
exports.sellOrder = async (req, res) => {
  try {
    const { pair, sellPrice, amount } = req.body;
    const order = await sellOrder(pair, sellPrice, amount);

    if (order.id) {
      const newOrder = new Order({
        pair,
        type: "sell",
        price: sellPrice,
        amount,
        status: "success"
      });
      await newOrder.save();
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Sell order failed", error });
  }
};
