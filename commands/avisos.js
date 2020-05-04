const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar mensagens.');
    const user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(user.id === "547967082952785933") return message.channel.send("Zero avisos q-p");
    if(user.id === "303235142283952128") return message.channel.send("Near tem -8000 avisos.");
    if (user.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Esse usuário não tem nenhum aviso.');
    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'Não especificado';
    if (!user) return message.channel.send('Não foi possível encontrar o usuário!');

    Profile.findOne({userID: user.id}, async (err, result) => {
        if (err) console.error(err);
        if (result.warnings == 0) return message.channel.send('Esse usuário não tem nenhum aviso.');
        if (result.warnings < 2) return message.channel.send(`\`\`\`\n${user.user.tag} | ${user.user.id} | ${result.warnings.toString()} aviso\n${result.warningsDetail.join('\n')}\n\`\`\``);
        message.channel.send(`\`\`\`\n${user.user.tag} | ${user.user.id} | ${result.warnings.toString()} avisos\n${result.warningsDetail.join('\n')}\n\`\`\``);
    });
};

exports.help = {
    name: "avisos",
    aliases: ['warnings'],
    categoria: "Moderação",
    descrição: "Checa os avisos de um usuário.",
    uso: "avisos <usuário> | avisos Near",
    permissões: "Gerenciar mensagens",
    disabled: false
};