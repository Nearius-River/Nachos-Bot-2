const Discord = require('discord.js');
const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    let value = args[0];
    if (isNaN(value)) return message.channel.send('Você só pode sacar valores númericos.');
    if (value <= 0) return message.channel.send('Você deve sacar uma quantidade positiva.');

    Profile.findOne({ userID: message.author.id }, async (err, files) => {
        if (err) console.error(err);
        if (files.memberEconomy.deposit < parseInt(value)) return message.channel.send('Você não pode sacar mais do que você tem.');

        await bot.updateMemberProfile(message.author, { memberEconomy: { coins: files.memberEconomy.coins + parseInt(value) }});
        await bot.updateMemberProfile(message.author, { memberEconomy: { deposit: files.memberEconomy.deposit - parseInt(value) }});

        if (value == 1) return message.channel.send(`Você sacou 1 real.`);
        message.channel.send(`Você sacou ${value} reais.`);
    });
};

exports.command = {
    aliases: ['sac', 'with', 'withdraw'],
    description: "Saca uma quantidade de reaid depositada no banco.",
    usage: "sacar <quantidade> | sacar 100",
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