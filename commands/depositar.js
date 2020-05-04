const Discord = require('discord.js');
const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    let value = args[0];
    if (isNaN(value)) return message.channel.send('Você só pode depositar valores númericos.');
    if (value <= 0) return message.channel.send('Você deve depositar uma quantidade positiva.');

    Profile.findOne({ userID: message.author.id }, async (err, files) => {
        if (err) console.error(err);
        if (files.coins < parseInt(value)) return message.channel.send('Você não pode depositar mais do que você tem.');

        await bot.updateProfile(message.author, { coins: files.coins - parseInt(value)});
        await bot.updateProfile(message.author, { depositado: files.depositado + parseInt(value)});

        if (value == 1) return message.channel.send(`Você depositou 1 real.`);
        message.channel.send(`Você depositou ${value} reais.`);
    });
};

exports.help = {
    name: "depositar",
    aliases: ['dep'],
    categoria: "Economia",
    descrição: "Deposita uma quantidade de reais no banco.",
    uso: "depositar <quantidade> | depositar 100",
    permissões: "Nenhuma",
    disabled: false
};