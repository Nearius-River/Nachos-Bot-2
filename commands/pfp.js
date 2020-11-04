const Discord = require('discord.js');

exports.run = async (bot, message, args, settings, member) => {
    let embed = new Discord.MessageEmbed().setColor(message.guild.me.displayColor).setTitle(member.user.tag);

    if (member.user.displayAvatarURL().endsWith('?size=2048')) {
        embed.setImage(member.user.displayAvatarURL());
        embed.setDescription(`Clique [aqui](${member.user.displayAvatarURL()}) para abrir no navegador.`);
    } else {
        embed.setImage(`${member.user.displayAvatarURL()}?size=2048`);
        embed.setDescription(`Clique [aqui](${member.user.displayAvatarURL()}?size=2048) para abrir no navegador.`);
    }
    message.channel.send(embed);
};

exports.command = {
    aliases: ['av', 'avatar'],
    description: "Visualiza o avatar completo de um usuário.",
    usage: "avatar [usuário] | avatar Near",
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