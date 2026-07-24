const { Telegraf } = require("telegraf");
const env = require("./config/env");

// lấy token từ env
const token = env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error("Chưa có BOT_TOKEN trong file .env kìa ní ơi!");
}

// chạy bot
const bot = new Telegraf(token);

// /start command
const setupStartCommand = require("./bot/commands/start");
setupStartCommand(bot);

// đọc text message
const setupTextEvents = require("./bot/events/text");
setupTextEvents(bot);

// run bot
bot.launch();
console.log("Bot đã chạy, húp!!!!");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
