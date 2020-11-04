const Discord = require('discord.js');
const Profile = require('../models/profile');

exports.run = async (bot, message, args, settings) => {
    let embed = new Discord.MessageEmbed().setColor('#FFFFFF').setAuthor(message.author.tag, message.author.displayAvatarURL());

    let profile = await bot.getProfile(message.member);

    embed.addField('Reais', `R$${profile.coins}`, true);
    embed.addField('Depositado', `R$${profile.depositado}`, true);
    embed.addField('Total', `R$${profile.coins + profile.depositado}`, true);
    message.channel.send(embed);
};

exports.help = {
    name: "bal",
    aliases: ['balanca', 'reais', 'coins'],
    categoria: "Economia",
    descrição: "Verifica sua quantidade de reais.",
    uso: "bal",
    permissões: "Nenhuma",
    disabled: false
};