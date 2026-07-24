const axios = require("axios");
const env = require("../config/env");
const { Markup } = require("telegraf");

module.exports = (bot) => {
  // lắng nghe message
  bot.on("text", async (ctx) => {
    const message = ctx.message.text;

    // tách tin nhắn thành từng dòng và kiểm tra dòng cuối cùng
    const lines = message.split("\n").map((line) => line.trim());
    const lastLine = lines[lines.length - 1].toLowerCase();

    // kiểm tra dòng cuối phải "in/In" khong
    if (lastLine === "in") {
      // dùng Regex để "lọc" lấy các mã đơn hàng
      // bắt đầu bằng GY và chỉ bao gồm chữ và số
      const orderCodes = message.match(/GY[A-Z0-9]+/g);

      if (!orderCodes || orderCodes.length === 0) {
        return ctx.reply(
          "Không tìm thấy mã đơn hàng nào hợp lệ (bắt đầu bằng GY) trong tin nhắn nha ní.",
        );
      }

      // nối các mã lại bằng dấu phẩy
      const orderCodesStr = orderCodes.join(",");

      try {
        // call API lấy token
        const response = await axios.post(
          "https://nhanh-api.ghn.vn/api/lastmile/order/gen-a5-token",
          {
            order_codes: orderCodesStr,
          },
          {
            headers: {
              "x-warehouseid": "21606000",
              authorization: env.AUTHORIZATION_TOKEN,
            },
          },
        );

        // success
        if (response.data && response.data.code === 200) {
          const token = response.data.data.token;
          const printUrl = `https://online-gateway.ghn.vn/a5/public-api/printA5?token=${token}`;

          // bot rep link
          await ctx.reply("In phiếu trả hàng A5", {
            reply_to_message_id: ctx.message.message_id, // rep user
            ...Markup.inlineKeyboard([
              Markup.button.url("Link", printUrl), // tạo nút chuyển hướng tới link in
            ]),
          });
        } else {
          ctx.reply(
            "Lỗi rồi ní ơi ní: " +
              (response.data.message || "Chịu mẹ lun không biết ://"),
          );
        }
      } catch (error) {
        console.error(error);
        ctx.reply("Đéo má thua lỗi rồi ní, hú thằng làm bot cái !!!");
      }
    }
  });
};
