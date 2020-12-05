const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.find(u => u.id == args[0]);
    if (!user) user = message.member;

    const profile = bot.getMemberProfile(user);
    if (!profile) return message.channel.send('Esse usuário ainda não tem um perfil criado :/');

    try {
        const MessageEmbed = new Discord.MessageEmbed();
        MessageEmbed.setAuthor(user.user.tag, user.user.displayAvatarURL());
        MessageEmbed.addField('Experiência', profile.memberProfile.experience, true);
        MessageEmbed.addField('Nível', profile.memberProfile.level, true);
        MessageEmbed.addField('Total de experiência', profile.totalExperience, true);
        MessageEmbed.addField('Restante até o próximo nível', profile.memberProfile.toNextLevel - profile.memberProfile.experience, true);
        message.channel.send(MessageEmbed);
    } catch (e) {
        return message.channel.send(`Um erro ocorreu ao executar o comando, foi mal!\n ${e}`);
    }
};

exports.command = {
    aliases: ['status', 'profile'],
    description: "Visualiza seu nível, pontos de atividade, e outras informações.",
    usage: "perfil [usuário] | perfil Monika",
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