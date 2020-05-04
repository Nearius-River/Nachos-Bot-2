const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');

exports.run = async (bot, message, args, settings) => {
    let user = message.mentions.members.first() || message.guild.members.find(u => u.user.id === args[0]) || message.guild.members.find(u => u.user.username === args[0]) || message.guild.members.find(u => u.user.tag === args[0]);
    let embed = new Discord.RichEmbed();

    if (!user || user.user.id == message.author.id) {
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL);
        embed.setThumbnail(message.author.displayAvatarURL);
        if (message.member.displayHexColor == '#000000') {
            embed.setColor('#9BAAB4');
        } else embed.setColor(message.member.displayHexColor);
        embed.addField('Nome', `${message.author.tag} | ${message.author.id}`);
        embed.addField('Conta criada em', moment(message.author.createdAt).format('lll'));
        embed.addField('Entrou no servidor em', moment(message.member.joinedAt).format('lll'));
        embed.addField('Última mensagem enviada', message.author.lastMessage);
    } else {
        embed.setAuthor(user.user.tag, user.user.displayAvatarURL);
        embed.setThumbnail(user.user.displayAvatarURL);
        if (user.displayHexColor == '#000000') {
            embed.setColor('#9BAAB4');
        } else embed.setColor(user.displayHexColor);
        embed.addField('Nome', `${user.user.tag} | ${user.user.id}`);
        embed.addField('Conta criada em', moment(user.user.createdAt).format('lll'));
        embed.addField('Entrou no servidor em', moment(user.joinedAt).format('lll'));
		if (user.user.lastMessage == null) embed.addField('Última mensagem enviada', 'Não foi possível encontrar nenhuma mensagem :/');
        else embed.addField('Última mensagem enviada', user.user.lastMessage);
    }

    message.channel.send(embed);
};

exports.help = {
    name: "userinfo",
    aliases: [],
    categoria: "Informação",
    descrição: "Visualiza informações sobre um usuário.",
    uso: "userinfo [usuário] [opção] | userinfo Near",
    permissões: "Nenhuma",
    disabled: false
};