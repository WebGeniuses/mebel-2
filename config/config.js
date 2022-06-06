require("dotenv").config();


const {env} = require("process");

module.exports = {
    ADMIN: env.ADMIN,
    USER: env.USER,
    chatId: env.CHAT_URL,
    botToken: env.BOT_TOKEN,
    JWT: env.JWT,
    pass: env.PASS

};