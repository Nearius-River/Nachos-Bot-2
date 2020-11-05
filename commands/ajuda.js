const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    let embed = new Discord.MessageEmbed();
    const commandName = args[0];
    const realCommand = bot.commands.get(commandName) || bot.commands.find(c => c.command.aliases.some(word => word === commandName));

    if (commandName == 'ajuda' || commandName == 'help' || !realCommand) return message.channel.send(`Para obter ajuda em um comando, use \`ajuda <comando>\` **Exemplo:** ajuda mute\nPara uma lista de comandos, use **comandos**\nCaso tenha encontrado algum erro, contate Near#8072 ou use o comando \`bugreport\`.`);

    const commandDescription = realCommand.command.description;
    const commandCategory = realCommand.command.commandCategory;
    let commandUsage = realCommand.command.usage;
    const commandAliases = realCommand.command.aliases;

    //# This thing won't work unless I do this #//
    commandUsage = commandUsage.replace('<', '`<');
    commandUsage = commandUsage.replace('>', '>`');
    commandUsage = commandUsage.replace('[', '´[`');
    commandUsage = commandUsage.replace(']', ']`');

    embed.addField('Descrição', commandDescription);

    if (commandUsage.length >= 1) {
        embed.addField('Exemplo', commandUsage);
    }

    if (commandCategory.administration)
    {
        embed.setTitle('Administração: ' + commandName);
        embed.setColor('#FF3131');

        if (commandAliases.length >= 1) {
            embed.setFooter(commandName + ' (' + commandAliases.join(', ') + ')', 'https://cdn.discordapp.com/attachments/587108839707508738/592937314708226049/hammer.png');
        }
    }

    else if (commandCategory.information)
    {
        embed.setTitle('Informação: ' + commandName);
        embed.setColor('#35AAFF');

        if (commandAliases.length >= 1) {
            embed.setFooter(commandName + ' (' + commandAliases.join(', ') + ')', 'https://cdn.discordapp.com/attachments/587108839707508738/592937319175290900/question.png');
        } else {
            embed.setFooter(commandName);
        }
    }

    else if (commandCategory.economy)
    {
        embed.setTitle('Economia: ' + commandName);
        embed.setColor('#93C727');

        if (commandAliases.length >= 1) {
            embed.setFooter(commandName + ' (' + commandAliases.join(', ') + ')', 'https://cdn.discordapp.com/attachments/587108839707508738/592936175346515986/cedula.png');
        }
    }

    else if (commandCategory.util)
    {
        embed.setTitle('Útil: ' + commandName);
        embed.setColor('#FFA735');

        if (commandAliases.length >= 1) {
            embed.setFooter(commandName + ' (' + commandAliases.join(', ') + ')', 'https://cdn.discordapp.com/attachments/587108839707508738/592935408845979659/engine.png');
        }
    }

    else if (commandCategory.music)
    {
        embed.setTitle('Música: ' + commandName);
        embed.setColor('#554FCA');

        if (commandAliases.length >= 1) {
            embed.setFooter(commandName + ' (' + commandAliases.join(', ') + ')', 'https://cdn.discordapp.com/attachments/587108839707508738/773372228069883974/6.png');
        }
    }

    else if (commandCategory.development)
    {
        embed.setTitle('Desenvolvimento: ' + commandName);
        embed.setColor('#7C22D6');

        if (commandAliases.length >= 1) {
            embed.setFooter(commandName + ' (' + commandAliases.join(', ') + ')', 'https://cdn.discordapp.com/attachments/587108839707508738/592933829115772939/xd.png');
        }
    }

    message.channel.send(embed);
};

exports.command = {
    aliases: ['help'],
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