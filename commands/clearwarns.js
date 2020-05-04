const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar mensagens.');
    const user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!user.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Esse usuário não tem nenhum aviso.');
    if (!user) return message.channel.send('Não foi possível encontrar o usuário!');

    Profile.findOne({userID: user.id}, async (err, result) => {
        if (err) console.error(err);
        if (result.warnings == 0) return message.channel.send('Esse usuário não tem nenhum aviso');
        message.channel.send(`Certo! Limpado ${result.warnings.toString()} avisos de ${user.user.username}`);
        result.warnings = 0;
        result.warningsDetail = Array;
        result.save();
    });
};

exports.help = {
    name: "clearwarns",
    aliases: ['clearwarn', 'limparavisos', 'clearwarnings'],
    categoria: "Moderação",
    descrição: "Limpa os avisos de um usuário.",
    uso: "clearwarns <usuário> | clearwarns Near",
    permissões: "Gerenciar mensagens",
    disabled: false
};