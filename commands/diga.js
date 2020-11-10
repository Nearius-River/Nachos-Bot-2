const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    let botMessage = args.join(' ');
    if (botMessage.length < 1) return message.channel.send('Não da pra enviar uma mensagem em branco :/');
    if (botMessage.includes("@everyone")) return message.channel.send("Você não pode mencionar everyone ou here nas mensagens.");
    if (botMessage.includes("@here")) return message.channel.send("Você não pode mencionar everyone ou here nas mensagens.");
    if (botMessage.includes('-e')) {
        message.delete().catch();
        let embed = new Discord.MessageEmbed().setDescription(botMessage.replace('-e', ' ')).setColor(bot.defaults.mainSettings.invisibleColor);
        return message.channel.send(embed);
    }
    message.delete().catch();
    message.channel.send(botMessage);
};

exports.command = {
    aliases: [],
    description: "Faça o bot falar alguma coisa. É possivel incluir `-e` no conteúdo para enviar como uma embed.",
    usage: "diga <mensagem> | diga Bom dia | diga Boa tarde -e",
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