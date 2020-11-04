const Discord = require('discord.js');
const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    if (!bot.owners.includes(message.author.id)) return message.channel.send('Apenas o desenvolvedor pode usar esse comando.');
    let user = message.mentions.members.first() || message.guild.members.cache.find(u => u.user.id === args[0]) || message.guild.members.cache.find(u => u.user.username === args[0]) || message.guild.members.cache.find(u => u.user.tag === args[0]);

    Profile.findOne({ userID: user.user.id }, async (err, files) => {
        if (err) console.error(err);

        await bot.updateProfile(user.user, { coins: files.coins + parseInt(args[1]) });
    });

    message.channel.send(`Foram adicionados ${args[1]} reais na conta do ${user.user.tag}.`);
};

exports.command = {
    aliases: ['addcash', 'givemoney', 'add-cash', 'give-money'],
    description: "Adiciona uma quantidade de reais a um usuário.",
    usage: "addmoney <usuário> <quantidade>",
    commandPermissions: ['DEVELOPER'],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: false,
        music: false,
        development: true
    },
    disabled: false
};