//' #app.js | index.js #Nachos Bot (2.0) | By Near#8072 '//
const Discord = require('discord.js');
const bot = new Discord.Client();
const colors = require('./utils/colorsTheme.js');
require('./utils/botFunctions')(bot); //' Require main bot functions and set it to bot '//
require('dotenv-flow').config();
const config = { token: process.env.TOKEN, owner: process.env.OWNER, prefix: process.env.PREFIX };
module.exports = bot;
//' Load commands and bot events '//
const { carregarComandos, carregarEventos } = require('./utils/handler.js');
carregarComandos();
carregarEventos();
//' Initiate mongoose connection and starts the bot '//
bot.mongoose = require('./utils/mongoose.js');
bot.mongoose.init();
bot.login(config.token);
//' Catches an unhandled rejection error on process and logs it '//
process.on('unhandledRejection', err => {
  console.error(`PROCESSO | Foi encontrado um erro no processo.`.error + `\n${err.stack}`.warn);
});

process.on('uncaughtException', err => {
  console.error(`PROCESSO | Foi encontrada uma exceção no processo.`.error + `\n${err.stack}`.warn);
});