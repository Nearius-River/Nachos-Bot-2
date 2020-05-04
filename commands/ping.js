const { RichEmbed } = require('discord.js');

exports.run = (bot, message, args) => {

    const resultEmbed = new RichEmbed()
    //.setTitle(replies[result])
    .setColor(process.env.INVISIBLE)
    .addField(`Ping atual`, `Aproximadamente **${Math.floor(bot.ping)}** milisegundos`)
    .addField(`Pings anteriormente`, bot.pings.join(', '))
    .setTimestamp();

    message.channel.send(resultEmbed);
};

exports.help = {
    name: "ping",
    aliases: ['delay'],
    categoria: "Informação",
    descrição: "Verifica a latência (delay) do bot em milisegundos.",
    uso: "ping",
    permissões: "Nenhuma",
    disabled: false
};