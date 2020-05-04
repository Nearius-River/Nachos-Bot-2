const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let user = message.mentions.members.first() || message.guild.members.find(u => u.id == args[0]);
    if (!user) user = message.member;

    let embed = new Discord.RichEmbed()
    .setColor(process.env.INVISIBLE)
    .setTitle(user.user.tag);
    if (user.user.displayAvatarURL.endsWith('?size=2048')) {
        embed.setImage(user.user.displayAvatarURL);
        embed.setDescription(`Clique [aqui](${user.user.displayAvatarURL}) para abrir no navegador.`);
    } else {
        embed.setImage(`${user.user.displayAvatarURL}?size=2048`);
        embed.setDescription(`Clique [aqui](${user.user.displayAvatarURL}?size=2048) para abrir no navegador.`);
    }
    message.channel.send(embed);
};

exports.help = {
    name: "pfp",
    aliases: ['avatar'],
    categoria: "Informação",
    descrição: "Visualiza o avatar de um usuário.",
    uso: "avatar [usuário] | avatar Near",
    permissões: "Nenhuma",
    disabled: false
};