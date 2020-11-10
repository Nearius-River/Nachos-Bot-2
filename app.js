//' #app.js | index.js #Nachos Bot (2.0) | By Near#8072 '//
const Discord = require('discord.js');
const bot = new Discord.Client();
const colors = require('./utils/colorsTheme.js');
require('./utils/nachosFunctions')(bot); //' Require main bot functions and set it to bot '//
bot.defaults = require('./utils/nachosDefaults');
module.exports = bot;
//' Load commands and bot events '//
const { carregarComandos, carregarEventos } = require('./utils/handler.js');
carregarComandos();
carregarEventos();
//' Initiate mongoose connection and starts the bot '//
bot.mongoose = require('./utils/mongoose.js');
bot.mongoose.init();
bot.login(bot.defaults.mainSettings.botToken);
//' Catches an unhandled rejection error on process and logs it '//
process.on('unhandledRejection', err => {
  console.error(`PROCESSO | Foi encontrado um erro no processo.`.error + `\n${err.stack}`.warn);
});

process.on('uncaughtException', err => {
  console.error(`PROCESSO | Foi encontrada uma exceção no processo.`.error + `\n${err.stack}`.warn);
});