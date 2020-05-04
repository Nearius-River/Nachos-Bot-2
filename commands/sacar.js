const Discord = require('discord.js');
const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    let value = args[0];
    if (isNaN(value)) return message.channel.send('Você só pode sacar valores númericos.');
    if (value <= 0) return message.channel.send('Você deve sacar uma quantidade positiva.');

    Profile.findOne({ userID: message.author.id }, async (err, files) => {
        if (err) console.error(err);
        if (files.depositado < parseInt(value)) return message.channel.send('Você não pode sacar mais do que você tem.');

        await bot.updateProfile(message.author, { coins: files.coins + parseInt(value)});
        await bot.updateProfile(message.author, { depositado: files.depositado - parseInt(value)});

        if (value == 1) return message.channel.send(`Você sacou 1 real.`);
        message.channel.send(`Você sacou ${value} reais.`);
    });
};

exports.help = {
    name: "sacar",
    aliases: ['sac', 'saque'],
    categoria: "Economia",
    descrição: "Saca uma quantidade de reais do banco.",
    uso: "sacar <quantidade> | sacar 100",
    permissões: "Nenhuma",
    disabled: false
};