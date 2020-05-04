const bot = require('../app.js');
const Discord = require('discord.js');
const fs = require('fs-extra');

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

module.exports.carregarComandos = () => {
    fs.readdir('./commands', (err, files) => {
        if (err) return console.error(`HANDLER > COMANDOS | Um erro ocorreu ao carregar os comandos.`.error + `\n${err}`.warn);
        let file = files.filter(f => f.split(".").pop() === "js"); //' Only read files that end with .js '//
        if (file.length <= 0) return console.error(`COMANDO | Não foi possível encontrar o comando ${file}`.error); //' If the file length is equals or less than 0, error in console and return '//
        file.forEach(f => {
            let props = require(`../commands/${f}`);
            console.log(`COMANDO | Carregado ${f.split('.')[0]}!`.loaded);
            bot.commands.set(props.help.name, props);
            if (props.help.aliases) props.help.aliases.forEach(alias => bot.aliases.set(alias, props.help.name));
        });
    });
};