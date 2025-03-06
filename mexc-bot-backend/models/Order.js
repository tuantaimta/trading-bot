const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  pair: String,
  type: String, // buy or sell
  price: Number,
  amount: Number,
  status: String, // success, failed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
