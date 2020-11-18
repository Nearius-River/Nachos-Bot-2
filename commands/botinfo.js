const Discord = require('discord.js');
const ms = require('ms');
const packageVersion = require('latest-version');
const packages = require('../package.json');

exports.run = async (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Nachos Bot ' + bot.defaults.mainSettings.releaseVersion + ' (' + bot.defaults.mainSettings.releaseChannel + ')', bot.user.displayAvatarURL())
    .setColor(bot.defaults.mainSettings.invisibleColor)
    .addField('Geral', `**${bot.guilds.cache.size}** Servidores\n**${bot.users.cache.size}** Usuários\n**${bot.channels.cache.size}** Canais`)
    .addField('Total') //Finalizar amanhã
    .addField('Links', `**[Convidar o bot](https://discordapp.com/oauth2/authorize?&client_id=547967082952785933&permissions=0&scope=bot)**\n**[Servidor de\ndesenvolvimento](https://discord.gg/nkd2d7f)**`, true)
    .addField('Livrarias', 'discord.js: ' + await packageVersion('discord.js') + ' (' + packages.dependencies["discord.js"] + ')', true)
    .setFooter(`Uptime: ${ms(bot.uptime)}`, bot.user.displayAvatarURL());
    message.channel.send(embed);
};

exports.help = {
    name: "info",
    aliases: ['botinfo'],
    categoria: "Informação",
    descrição: "Visualiza informações sobre o bot.",
    uso: "info",
    permissões: "Nenhuma",
    disabled: false
};

exports.command = {
    aliases: ['info'],
    description: "Visualiza diversas informações sobre o bot.",
    usage: "",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: true,
        music: false,
        development: false
    },
    disabled: false
};