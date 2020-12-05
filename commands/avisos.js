const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar mensagens.');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(user.id === "547967082952785933") return message.channel.send("Zero avisos q-p");
    if(user.id === "303235142283952128") return message.channel.send("Near tem -8000 avisos.");
    if (user.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Esse usuário não tem nenhum aviso.');
    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'Não especificado';
    if (!user) return message.channel.send('Não foi possível encontrar o usuário!');

    Profile.findOne({userID: user.id}, async (err, result) => {
        if (err) console.error(err);
        if (result.memberModeration.warningsTotal == 0) return message.channel.send('Esse usuário não tem nenhum aviso.');
        if (result.memberModeration.warningsTotal < 2) return message.channel.send(`\`\`\`\n${user.user.tag} | ${user.user.id} | ${result.memberModeration.warningsTotal.toString()} aviso\n${result.memberModeration.warningsDetail.join('\n')}\n\`\`\``);
        message.channel.send(`\`\`\`\n${user.user.tag} | ${user.user.id} | ${result.memberModeration.warningsTotal.toString()} avisos\n${result.memberModeration.warningsDetail.join('\n')}\n\`\`\``);
    });
};

exports.command = {
    aliases: ['warns', 'warnings'],
    description: "Visualiza os avisos do perfil de um usuário.",
    usage: "avisos <usuário> | avisos Near",
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