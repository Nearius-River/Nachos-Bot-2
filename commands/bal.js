const Discord = require('discord.js');
const Profile = require('../models/profile');

exports.run = async (bot, message, args, settings) => {
    let embed = new Discord.MessageEmbed()
    .setColor('#FFFFFF')
    .setAuthor(message.author.tag, message.author.displayAvatarURL());

    Profile.findOne({userID: message.author.id}, async (err, profile) => {
        if (err) console.error(err);
        const newProfile = {
            userID: message.author.id,
            username: message.author.tag
        };
        if (!profile) await bot.createProfile(newProfile);

        embed.addField('Reais', `R$${profile.coins}`, true);
        embed.addField('Depositado', `R$${profile.depositado}`, true);
        embed.addField('Total', `R$${profile.coins + profile.depositado}`, true);
        return message.channel.send(embed);
    });
};

exports.help = {
    name: "bal",
    aliases: ['balanca', 'reais'],
    categoria: "Economia",
    descrição: "Verifica sua quantidade de reais.",
    uso: "bal",
    permissões: "Nenhuma",
    disabled: false
};