const Discord = require('discord.js');
const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    let user = message.mentions.users.first() || message.guild.members.cache.find(m => m.id == args[0]);
    if (!user) return message.channel.send('Não foi possivel encontrar o usuário!');
    let value = args[1];
    if (isNaN(value)) return message.channel.send('Você só pode pagar valores númericos.');
    if (value <= 0) return message.channel.send('Você deve pagar uma quantidade positiva.');

    Profile.findOne({ userID: user.id }, async (err, files) => {
        if (err) console.error(err);
        if (!Profile) await bot.createProfile(user);
    });

    Profile.findOne({ userID: message.author.id }, async (err, files) => {
        if (err) console.error(err);
        if (files.coins < parseInt(value)) return message.channel.send('Você não pode enviar mais do que você tem.');

        await bot.updateProfile(message.author, { coins: files.coins - parseInt(value)});
        await bot.updateProfile(user, { depositado: files.coins + parseInt(value)});

        if (value == 1) return message.channel.send(`Você enviou 1 real para ${user.username}.`);
        message.channel.send(`Você enviou ${value} reais para ${user.username}.`);
    });
};

exports.command = {
    aliases: ['pay', 'send', 'send-money', 'send-cash'],
    description: "Envia uma quantidade de reais para um usuário.",
    usage: "pagar <usuário> <quantidade> | pagar Near 20",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: false,
        economy: true,
        util: false,
        music: false,
        development: false
    },
    disabled: false
};