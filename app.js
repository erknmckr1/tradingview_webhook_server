const bodyParser = require("body-parser");
const express = require("express");
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();
const app = express(); 
const port = 3000;

app.use(bodyParser.json());

const chatId = process.env.CHAT_ID
const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true });

// Telegram'a mesaj gönderen fonksiyon
function sendMessage(message) {
    bot.sendMessage(chatId, message);
}

app.post('/webhook', (req, res) => {
    const data = req.body;
    console.log('TradingView Webhook:', data);

    // Telegram'a mesaj gönder
    const message = `TradingView Sinyali: ${data.symbol} - ${data.side} - ${data.price}`;
   
    sendMessage(message);

    res.status(200).end();
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});