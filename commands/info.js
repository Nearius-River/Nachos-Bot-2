const Discord = require('discord.js');
const ms = require('ms');

exports.run = async (bot, message, args, settings) => {
    const embed = new Discord.RichEmbed()
    .setAuthor('Nachos Bot | Informações', bot.user.displayAvatarURL)
    .setColor(process.env.INVISIBLE)
    .addField('Geral', `**${bot.guilds.size}** Servidores\n**${bot.users.size}** Usuários\n**${bot.channels.size}** Canais`, true)
    .addField('Créditos', `**Pixel#4098**\n**TheSourceCode**`, true)
    .addField('Links', `**[Convidar o bot](https://discordapp.com/oauth2/authorize?&client_id=547967082952785933&permissions=0&scope=bot)**\n**[Servidor de desenvolvimento](https://discord.gg/nkd2d7f)**`, true)
    .addField('Updates', `12/03/2020\n**+** Bot revisado e atualizado. Revisão ainda está em andamento e possiveis melhorias ainda serão feitas. `)
    .setFooter(`Uptime: ${ms(bot.uptime)}`, bot.user.displayAvatarURL);

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