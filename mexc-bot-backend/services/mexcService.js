// Nhập thư viện ccxt để giao dịch tiền điện tử
const ccxt = require("ccxt");
// Tải các biến môi trường từ file .env
require("dotenv").config(); 

// Khởi tạo sàn MEXC với thông tin API
const exchange = new ccxt.mexc({
  apiKey: process.env.MEXC_API_KEY,
  secret: process.env.MEXC_SECRET_KEY
});

// Hàm để lấy giá hiện tại của một cặp giao dịch
async function getPrice(pair) {
  const ticker = await exchange.fetchTicker(pair);
  return ticker.last; // Trả về giá cuối cùng từ ticker
}

// Hàm để đặt lệnh giới hạn trên sàn
async function placeOrder(pair, type, price, amount) {
  try {
    const order = await exchange.createLimitOrder(pair, type, amount, price);
    return order; // Trả về chi tiết lệnh nếu thành công
  } catch (error) {
    console.error("Lệnh thất bại:", error); // Ghi lại bất kỳ lỗi nào xảy ra
    throw error; // Ném lại lỗi để xử lý tiếp
  }
}

// Xuất các hàm getPrice và placeOrder để sử dụng trong các module khác
module.exports = { getPrice, placeOrder };
