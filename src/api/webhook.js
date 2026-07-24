const { Telegraf } = require("telegraf");

// lấy Token
const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

// nạp commands
const setupStartCommand = require("../src/bot/commands/start");
const setupTextEvents = require("../src/bot/events/text");

setupStartCommand(bot);
setupTextEvents(bot);

// vercel callback function
module.exports = async (req, res) => {
  try {
    // chỉ sử lí POST request từ Telegram
    if (req.method === "POST") {
      await bot.handleUpdate(req.body, res);
    } else {
      // nếu ai đó truy cập bằng trình duyệt (GET)
      res.status(200).send("API Webhook của Bot Telegram đang hoạt động!");
    }
  } catch (err) {
    console.error("Lỗi Webhook: ", err);
    res.status(500).send("Lỗi Server");
  }
};
