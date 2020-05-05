const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    let modcmds = [];
    let infocmds = [];
    let ecocmds = [];
    let servercmds = [];
    let funcmds = [];
    let devcmds = [];
    let othercmds = [];

    bot.commands.forEach(command => {
        if (command.help.categoria == 'Moderação') {
            modcmds.push(command.help.name);
        } else if (command.help.categoria == 'Informação') {
            infocmds.push(command.help.name);
        } else if (command.help.categoria == 'Economia') {
            ecocmds.push(command.help.name);
        } else if (command.help.categoria == 'Servidor') {
            servercmds.push(command.help.name);
        } else if (command.help.categoria == 'Diversão') {
            funcmds.push(command.help.name);
        } else if (command.help.categoria == 'Desenvolvedor') {
            devcmds.push(command.help.name);
        } else {
            othercmds.push(command.help.name);
        }
    });

    const embed = new Discord.MessageEmbed()
    .setTitle(`Total de comandos: ${bot.commands.size}`)
    .setColor("#FFFFFF")
    .setThumbnail('https://cdn.discordapp.com/attachments/587108839707508738/597617316704026634/cmdsimage.png')
    .addField(`Moderação [${modcmds.length}]`, modcmds.join(', '))
    .addField(`Informação [${infocmds.length}]`, infocmds.join(', '))
    .addField(`Economia [${ecocmds.length}]`, ecocmds.join(', '))
    .addField(`Servidor [${servercmds.length}]`, servercmds.join(', '))
    .addField(`Diversão [${funcmds.length}]`, funcmds.join(', '))
    .addField(`Desenvolvedor [${devcmds.length}]`, devcmds.join(', '))
    .addField(`Outros [${othercmds.length}]`, othercmds.join(', '));

    message.channel.send(embed);
};

exports.help = {
    name: "comandos",
    aliases: ['cmds', 'commands'],
    categoria: "Informação",
    descrição: "Visualiza os comandos do bot.",
    uso: "comandos",
    permissões: "Nenhuma",
    disabled: false
};