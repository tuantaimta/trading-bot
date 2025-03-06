const { getPrice } = require("../services/mexcService");

exports.getPrice = async (req, res) => {
  try {
    const { pair } = req.params;
    const price = await getPrice(pair);
    res.json({ success: true, price });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching price", error });
  }
};
