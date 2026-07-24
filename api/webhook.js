// kéo con bot đã nạp đầy đủ lệnh từ src/index.js sang đây
const bot = require("../src/index");

module.exports = async (req, res) => {
  try {
    // chỉ xử lý POST request thoi
    if (req.method === "POST") {
      await bot.handleUpdate(req.body, res);
    } else {
      res
        .status(200)
        .send(
          "API Webhook của Bot Telegram đang hoạt động! Zô Telegram test /start dùm đi ní!",
        );
    }
  } catch (err) {
    console.error("Lỗi Webhook: ", err);
    res.status(500).send("Lỗi Server");
  }
};
