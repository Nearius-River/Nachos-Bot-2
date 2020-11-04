const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.find(u => u.id == args[0]);
    if (!user) user = message.member;

    const profile = bot.getProfile(user);
    if (!profile) return message.channel.send('Esse usuário ainda não tem um perfil criado :/');

    try {
        const MessageEmbed = new Discord.MessageEmbed();
        MessageEmbed.setAuthor(user.user.tag, user.user.displayAvatarURL());
        MessageEmbed.addField('Experiência', profile.experience, true);
        MessageEmbed.addField('Nível', profile.level, true);
        MessageEmbed.addField('Total de experiência', profile.totalExperience, true);
        MessageEmbed.addField('Restante até o próximo nível', profile.toNextLevel - profile.experience, true);
        message.channel.send(MessageEmbed);
    } catch (e) {
        return message.channel.send(`Um erro ocorreu ao executar o comando, foi mal!\n ${e}`);
    }
};

exports.help = {
    name: "nivel",
    aliases: ['level', 'rank'],
    descrição: "Visualiza seu nível, experiência e outras informações.",
    uso: "nivel [usuário] | nivel Near",
    permissões: "Nenhuma", //' Substituir por array de permissões mais tarde '//
    categoria: "Informação",
    // categoriaDeComando: {
    //     moderação: false,
    //     informação: true,
    //     economia: false,
    //     servidor: false,
    //     diversão: false,
    //     desenvolvedor: false,
    //     outros: false
    // }, //' Nova forma de determinar a categoria de um comando, substituiundo "categoria" '//
    disabled: false
};