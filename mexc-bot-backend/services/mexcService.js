const ccxt = require("ccxt");
require("dotenv").config();

const exchange = new ccxt.mexc({
  apiKey: process.env.MEXC_API_KEY,
  secret: process.env.MEXC_SECRET_KEY
});

// Lấy giá hiện tại của cặp giao dịch
async function getPrice(pair) {
  const ticker = await exchange.fetchTicker(pair);
  return ticker.last;
}

// Đặt lệnh mua hoặc bán
async function placeOrder(pair, type, price, amount) {
  try {
    const order = await exchange.createLimitOrder(pair, type, amount, price);
    return order;
  } catch (error) {
    console.error("Order failed:", error);
    throw error;
  }
}

// Kiểm tra giá hiện tại và tự động bán nếu đạt mức giá mong muốn
async function sellOrder(pair, sellPrice, amount) {
  try {
    const currentPrice = await getPrice(pair);
    console.log(`Current price: ${currentPrice}, Sell target: ${sellPrice}`);

    if (currentPrice >= sellPrice) {
      const order = await placeOrder(pair, "sell", sellPrice, amount);
      return order;
    } else {
      return { message: "Chưa đạt giá bán mong muốn" };
    }
  } catch (error) {
    console.error("Sell order failed:", error);
    throw error;
  }
}

module.exports = { getPrice, placeOrder, sellOrder };
