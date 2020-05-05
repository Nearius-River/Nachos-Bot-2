const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    let botMessage = args.join(' ');
    if (botMessage.length < 1) return message.channel.send('Não da pra enviar uma mensagem em branco :/');
    if (botMessage.includes("@everyone")) return message.channel.send("Você não pode mencionar everyone ou here nas mensagens.");
    if (botMessage.includes("@here")) return message.channel.send("Você não pode mencionar everyone ou here nas mensagens.");
    if (botMessage.includes('-e')) {
        message.delete().catch();
        let embed = new Discord.MessageEmbed().setDescription(botMessage.replace('-e', ' ')).setColor(process.env.INVISIBLE);
        message.channel.send(embed);
        return;
    }
    message.delete().catch();
    message.channel.send(botMessage);
};

exports.help = {
    name: "diga",
    aliases: ['say'],
    categoria: "Diversão",
    descrição: "Faça o bot falar alguma coisa. É possivel incluir `-e` no conteúdo para enviar como uma embed.",
    uso: "diga <conteúdo> | diga Morra | diga Olá meninas turu bão -e",
    permissões: "Nenhuma",
    disabled: false
};