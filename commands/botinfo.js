const Discord = require('discord.js');
const ms = require('ms');
const packageVersion = require('latest-version');
const packages = require('../package.json');

exports.run = async (bot, message, args, settings) => {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Nachos Bot | Informações', bot.user.displayAvatarURL())
    .setColor(process.env.INVISIBLE)
    .addField('Geral', `**${bot.guilds.cache.size}** Servidores\n**${bot.users.cache.size}** Usuários\n**${bot.channels.cache.size}** Canais`, true)
    .addField('Créditos', `**Pixel**\n**TheSourceCode**`, true)
    .addField('Links', `**[Convidar o bot](https://discordapp.com/oauth2/authorize?&client_id=547967082952785933&permissions=0&scope=bot)**\n**[Servidor de desenvolvimento](https://discord.gg/nkd2d7f)**`, true)
    .addField('Livrarias', `discord.js: ${packages.dependencies["discord.js"]}` + ` - ` + await packageVersion('discord.js'))
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