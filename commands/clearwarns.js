const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar mensagens.');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (user.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Esse usuário não tem nenhum aviso.');
    if (!user) return message.channel.send('Não foi possível encontrar o usuário!');

    Profile.findOne({userID: user.id}, async (err, result) => {
        if (err) console.error(err);
        if (result.memberModeration.warningsTotal < 1) return message.channel.send('Esse usuário não tem nenhum aviso.');
        message.channel.send(`Certo! Limpado ${result.memberModeration.warningsTotal.toString()} avisos de ${user.user.username}`);
        result.memberModeration.warningsTotal = 0;
        result.memberModeration.warningsDetail = Array;
        result.save();
    });
};

exports.command = {
    aliases: ['clearwarnings', 'purgewarns'],
    description: "Limpa os avisos do perfil de um usuário.",
    usage: "clearwarns <usuário> | clearwarns Near",
    commandPermissions: ['MANAGE_MESSAGES'],
    commandCategory: {
        administration: true,
        information: false,
        economy: false,
        util: false,
        music: false,
        development: false
    },
    disabled: false
};