const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let embed = new Discord.MessageEmbed().setColor('#FFFFFF').setAuthor(message.author.tag, message.author.displayAvatarURL());

    let profile = await bot.getUserProfile(message.member);

    embed.addField('Reais', `R$${profile.economy.coins}`, true);
    embed.addField('Depositado', `R$${profile.economy.deposit}`, true);
    embed.addField('Total', `R$${profile.economy.coins + profile.economy.deposit}`, true);
    message.channel.send(embed);
};

exports.command = {
    aliases: ['cash', 'money'],
    description: "Verifica quanto dinheiro você tem na sua conta.",
    usage: "",
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