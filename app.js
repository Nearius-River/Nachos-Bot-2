//' #app.js | index.js #Nachos Bot (2.0) | By Near#8072 '//
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs-extra');
const colors = require('./utils/colorsTheme.js');
require('./utils/botFunctions')(bot); //' Require main bot functions and set it to bot '//
require('dotenv-flow').config();
const config = { token: process.env.TOKEN, owner: process.env.OWNER, prefix: process.env.PREFIX };

const { carregarComandos } = require('./utils/handler.js');
bot.commands = new Discord.Collection(); bot.aliases = new Discord.Collection(); //' Creating a new collection for commands & aliases '//
bot.config = require('./config');
bot.mongoose = require('./utils/mongoose.js');
//' Command handler '//
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith('.js')) return console.error(`COMANDO | Comando '${file}' não é do tipo JavaScript. Comando não carregado.`.error); //' If file don't end with .js, return an error in console '//
      let props = require(`./commands/${file}`);
      console.log(`COMANDO | Carregado ${file.split('.')[0]}!`.loaded);
      bot.commands.set(props.help.name, props);
      if (props.help.name.length < 1) props.help.name = file.split('.')[0];
      if (props.help.aliases) props.help.aliases.forEach(alias => bot.aliases.set(alias, props.help.name));
  });
});
//' Event handler '//
fs.readdir("./events/", (err, files) => {
  if (err) console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) return console.error(`EVENTO | Evento '${file}' não é do tipo JavaScript. Evento não carregado.`.error); //' If file don't end with .js, return an error in console '//
    const evt = require(`./events/${file}`); //////////////' Require files in events folder '////////////////
    let evtName = file.split('.')[0]; /////////////////////' The name of the event, excludes the .js part '//
    console.log(`EVENTO | Carregado ${evtName}!`.loaded); //' Log on console once the event is loaded '///////
    bot.on(evtName,  evt.bind(null, bot)); ////////////////' Create a new event for the bot '////////////////
  });
});
//' Initiate mongoose connection and starts the bot '//
bot.mongoose.init();
bot.login(config.token);
//' Catches an unhandled rejection error on process and logs it '//
process.on('unhandledRejection', err => {
  console.error(`PROCESSO | Foi encontrado um erro no processo.`.error + `\n${err.stack}`.warn);
});

process.on('uncaughtException', err => {
  console.error(`PROCESSO | Foi encontrada uma exceção no processo.`.error + `\n${err.stack}`.warn);
});