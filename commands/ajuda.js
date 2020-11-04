const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    const toCmd = args[0];
    let embed = new Discord.MessageEmbed();
    const toInfo = bot.commands.get(toCmd) || bot.commands.find(c => c.help.aliases.some(word => word === toCmd));
    if (!toCmd || toCmd == 'ajuda' || toCmd == 'help' || !toInfo) return message.channel.send(`Para obter ajuda em um comando, use \`ajuda <comando>\` **Exemplo:** ajuda mute\nPara uma lista de comandos, use **comandos**\nCaso tenha encontrado algum erro, contate Near#8072 ou use o comando \`bugreport\`.`);

    embed.setTitle('Categoria | ' + toInfo.help.categoria);
    embed.addField('Descrição', toInfo.help.descrição);
    embed.addField('Como usar', toInfo.help.uso);
    if (toInfo.help.exemplos) embed.addField('Exemplos', toInfo.help.exemplos);
    embed.addField('Permissões necessárias', toInfo.help.permissões);
    if (toInfo.help.aliases.length > 0) {
        embed.addField('Aliases', toInfo.help.aliases.join(', '));
    } else embed.addField('Aliases', 'Nenhum');
    if (toInfo.help.categoria == 'Moderação') {
        embed.setColor('#FF3131');
        embed.setThumbnail('https://cdn.discordapp.com/attachments/587108839707508738/592937314708226049/hammer.png');
    } else if (toInfo.help.permissões == 'Nenhuma' && toInfo.help.categoria == 'Diversão') {
        embed.setColor('#2ec536');
        embed.setThumbnail('https://cdn.discordapp.com/attachments/549706481466081280/587110003949830171/Tada.png');
    } else if (toInfo.help.permissões == 'Nenhuma' && toInfo.help.categoria == 'Informação') {
        embed.setColor('#35aaff');
        embed.setThumbnail('https://cdn.discordapp.com/attachments/587108839707508738/592937319175290900/question.png');
    } else if (toInfo.help.categoria == 'Servidor') {
        embed.setColor('#ffa735');
        embed.setThumbnail('https://cdn.discordapp.com/attachments/587108839707508738/592935408845979659/engine.png');
    } else if (toInfo.help.categoria == 'Desenvolvedor') {
        if (!bot.owners.includes(message.author.id)) return message.channel.send('Este é um comando apenas para o desenvolvedor. Olhar pode causar confusões ¯\\_(ツ)_/¯');
        embed.setColor('#7c22d6');
        embed.setThumbnail('https://cdn.discordapp.com/attachments/587108839707508738/592933829115772939/xd.png');
    } else if (toInfo.help.categoria == 'Economia') {
        embed.setColor('#93c727');
        embed.setThumbnail('https://cdn.discordapp.com/attachments/587108839707508738/592936175346515986/cedula.png');
    } else {
        embed.setColor('#FFFFFF');
    }

    let mat = Math.floor(Math.random() * 4);
    if (mat == 3) embed.setFooter(`Dica: argumentos com <> são obrigatórios. Argumentos com [] são opcionais.`);

    return message.channel.send(embed);
};

exports.help = {
    name: "ajuda",
    aliases: ['help'],
    categoria: "Informação",
    descrição: "Ajuda",
    uso: "ajuda",
    permissões: "Nenhuma",
    disabled: false
};