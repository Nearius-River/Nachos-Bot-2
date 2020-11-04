const { MessageEmbed } = require('discord.js');

exports.run = (bot, message, args) => {

    const resultEmbed = new MessageEmbed()
    //.setTitle(replies[result])
    .setColor(process.env.INVISIBLE)
    .addField(`Ping atual`, `Aproximadamente **${Math.floor(bot.ping)}** milisegundos`)
    .addField(`Pings anteriormente`, bot.pings.join(', '))
    .setTimestamp();

    message.channel.send(resultEmbed);
};

exports.command = {
    aliases: [],
    description: "Verifica o delay do bot em milisegundos.",
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