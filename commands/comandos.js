const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    let MessageEmbed = new Discord.MessageEmbed();
    let administrationCmds = bot.commands.administration;
    let infoCmds = bot.commands.information;
    let economyCmds = bot.commands.economy;
    let utilCmds = bot.commands.util;
    let musicCmds = bot.commands.music;

    MessageEmbed.setAuthor('Lista de comandos', 'https://cdn.discordapp.com/attachments/587108839707508738/597617316704026634/cmdsimage.png');
    MessageEmbed.setColor(bot.defaults.mainSettings.mainColor);
    MessageEmbed.addField('Administração', `\`\`${administrationCmds.map((undefined, name) => {return name;}).join(', ')}\`\``, true);
    MessageEmbed.addField('Informação', `\`\`${infoCmds.map((undefined, name) => {return name;}).join(', ')}\`\``, true);
    MessageEmbed.addField('Economia', `\`\`${economyCmds.map((undefined, name) => {return name;}).join(', ')}\`\``);
    MessageEmbed.addField('Útil', `\`\`${utilCmds.map((undefined, name) => {return name;}).join(', ')}\`\``, true);
    MessageEmbed.addField('Música', `\`\`${musicCmds.map((undefined, name) => {return name;}).join(', ')}\`\``, true);

    message.channel.send(MessageEmbed);
};

exports.command = {
    aliases: ['cmds', 'commands'],
    description: "Visualiza uma lista de todos os comandos do bot.",
    usage: "",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: true,
        economy: false,
        util: false,
        music: false,
        development: false
    },
    disabled: false
};