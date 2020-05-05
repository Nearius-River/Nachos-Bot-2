const { MessageEmbed } = require('discord.js');

exports.run = async (bot, message, args, settings, user, send) => {
    let reportChannel = message.guild.channels.cache.find(c => c.id == settings.reportChannel);
    if (!reportChannel) {
        await message.delete();
        message.channel.send('Não foi possivel encontrar um canal para denúncias. Contate um administrador.');
        return;
    }
    if (!user) {
        await message.delete();
        message.channel.send('Não foi possivel encontrar o usuário :/');
        return;
    }
    let reason = args.slice(1).join(' ');
    if (!reason) {
        await message.delete();
        message.channel.send('Por favor digite um motivo válido.');
        return;
    }
    message.channel.send('Usuário denunciado com sucesso!');
    await message.delete();
    const reportEmbed = new MessageEmbed()
	.setColor('#FFFFFF')
    .addField('Usuário reportado', `<@${user.id}> | ${user.id}`)
    .addField('Reportado por', `<@${message.author.id}> | ${message.author.id}`)
    .addField('Motivo', reason)
    .setTimestamp();

    reportChannel.send(reportEmbed);
};

exports.help = {
    name: "report",
    aliases: ['reportar', 'denunciar'],
    categoria: "Servidor",
    descrição: "Denúncia um usuário do servidor.",
    uso: "report <usuário> <motivo> | report Near desrespeitando o shrek",
    permissões: "Nenhuma",
    disabled: false
};