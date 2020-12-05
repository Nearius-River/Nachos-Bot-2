const Discord = require('discord.js');
const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    let value = args[0];
    if (isNaN(value)) return message.channel.send('Você só pode depositar valores númericos.');
    if (value <= 0) return message.channel.send('Você deve depositar uma quantidade positiva.');

    Profile.findOne({ userID: message.author.id }, async (err, files) => {
        if (err) console.error(err);
        if (files.memberEconomy.coins < parseInt(value)) return message.channel.send('Você não pode depositar mais do que você tem.');

        await bot.updateMemberProfile(message.author, { memberEconomy: { coins: files.memberEconomy.coins - parseInt(value) }});
        await bot.updateMemberProfile(message.author, { memberEconomy: { deposit: files.memberEconomy.deposit + parseInt(value) }});

        if (value == 1) return message.channel.send(`Você depositou 1 real.`);
        message.channel.send(`Você depositou ${value} reais.`);
    });
};

exports.command = {
    aliases: ['dep'],
    description: "Deposita uma quantidade de reais no banco. Dinheiro memberEconomy.deposit não pode ser roubado.",
    usage: "depositar <quantidade> | depositar 100",
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