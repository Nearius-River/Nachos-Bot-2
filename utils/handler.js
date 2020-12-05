const bot = require('../app.js');
const Discord = require('discord.js');
const fs = require('fs-extra');
const chalk = require('chalk');

bot.commands = new Discord.Collection();
bot.commands.administration = new Discord.Collection();
bot.commands.information = new Discord.Collection();
bot.commands.economy = new Discord.Collection();
bot.commands.util = new Discord.Collection();
bot.commands.music = new Discord.Collection();

bot.aliases = new Discord.Collection();

exports.carregarComandos = () => {
    fs.readdir('./commands', (err, files) => {
        if (err) return console.error(`HANDLER > COMANDOS | Um erro ocorreu ao carregar os comandos.`.error + `\n${err}`.warn);

        files.forEach(file => {
            let props = require(`../commands/${file}`);
            const commandName = file.split('.')[0];

            bot.commands.set(commandName, props);
            if (props.command.aliases) {
                props.command.aliases.forEach(alias => {
                    bot.aliases.set(alias, commandName);
                });
            }
            console.log(chalk.yellow(`COMANDO | Carregado ${commandName}!`));

            let cmdCtgr = props.command.commandCategory;

            if (cmdCtgr.administration) {
                return bot.commands.administration.set(commandName);
            } else if (cmdCtgr.information) {
                return bot.commands.information.set(commandName);
            } else if (cmdCtgr.economy) {
                return bot.commands.economy.set(commandName);
            } else if (cmdCtgr.util) {
                return bot.commands.util.set(commandName);
            } else if (cmdCtgr.music) {
                return bot.commands.music.set(commandName);
            }
        });
    });
};

exports.carregarEventos = () => {
    fs.readdir('./events', (err, files) => {
        if (err) return console.error(`HANDLER > EVENTOS | Um erro ocorreu ao carregar os eventos.`.error + `\n${err}`.warn);

        files.forEach(file => {
            const evt = require(`../events/${file}`);
            let evtName = file.split('.')[0];

            bot.on(evtName, evt.bind(null, bot));
            console.log(chalk.yellow(`EVENTO | Carregado ${evtName}!`));
        });
    });
};