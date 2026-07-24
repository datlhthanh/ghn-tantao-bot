const { Telegraf } = require("telegraf");
require("dotenv").config();

// lấy token từ env
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error("Chưa có BOT_TOKEN trên Vercel kìa ní ơi!");
}

const bot = new Telegraf(token);

// nạp các lệnh
const setupStartCommand = require("./bot/commands/start");
setupStartCommand(bot);

const setupTextEvents = require("./bot/events/text");
setupTextEvents(bot);

// xuất con bot ra để file webhook xài
module.exports = bot;
