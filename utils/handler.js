const bot = require('../app.js');
const Discord = require('discord.js');
const fs = require('fs-extra');

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

module.exports.carregarComandos = () => {
    fs.readdir('./commands', (err, files) => {
        if (err) return console.error(`HANDLER > COMANDOS | Um erro ocorreu ao carregar os comandos.`.error + `\n${err}`.warn);
        files.forEach(file => {
            if (!file.endsWith('.js')) return console.error(`HANDLER > COMANDOS | Comando '${file}' não é do tipo JavaScript. Comando não carregado.`.error);
            let props = require(`../commands/${file}`);
            console.log(`COMANDO | Carregado ${file.split('.')[0]}!`.loaded);
            bot.commands.set(props.help.name, props);
            if (props.help.aliases) {
                props.help.aliases.forEach(alias => {
                    bot.aliases.set(alias, props.help.name);
                });
            }
        });
    });
};

module.exports.carregarEventos = () => {
    fs.readdir('./events', (err, files) => {
        if (err) return console.error(`HANDLER > EVENTOS | Um erro ocorreu ao carregar os eventos.`.error + `\n${err}`.warn);
        files.forEach(file => {
            if (!file.endsWith('.js')) return console.error(`HANDLER > EVENTOS | Evento '${file}' não é do tipo JavaScript. Evento não carregado.`.error);
            const evt = require(`../events/${file}`);
            let evtName = file.split('.')[0];
            console.log(`EVENTO | Carregado ${evtName}!`.loaded);
            bot.on(evtName, evt.bind(null, bot));
        });
    });
};