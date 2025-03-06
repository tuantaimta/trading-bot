const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const tradeRoutes = require("./routes/tradeRoutes");
const priceRoutes = require("./routes/priceRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("DB Connection Error:", err));

app.get('/',(req, res) => {
    res.send('Đã chạy');
})
app.use("/api", tradeRoutes);
app.use("/api", priceRoutes);

const PORT = 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
