const { RichEmbed } = require('discord.js');
const { Profile } = require('../models');
const moment = require('moment');
moment.locale('pt-br');

exports.run = async (bot, message, args, settings) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar mensagens.');
    const user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (user.id === "547967082952785933") return message.channel.send("Você tenta avisar o bot! É ineficaz!");
    if (user.id === "303235142283952128") return message.channel.send("Você não pode; ele é forte demais para você.");
    if (user.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Uhh você não pode avisar esse usuário.');
    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'Não especificado';
    if (!user) return message.channel.send('Não foi possível encontrar o usuário!');

    Profile.findOne({userID: user.id}, async (err, result) => {
        if (err) console.error(err);
        result.warnings += 1;
        result.warningsDetail.push(`Moderador: ${message.author.tag} | ${moment(message.createdAt).format('MMM, Do')}\n    ${reason}`);
        result.save();
        message.channel.send(`Certo, ${user.user.tag} foi avisado. Esse é o aviso número ${result.warnings.toString()}`);
    });

    const logEmbed = new RichEmbed()
    .setColor('#ffe200')
    .setTitle('Ação | Avisar')
    .addField('Usuário avisado', `<@${user.user.id}> | ${user.user.id}`)
    .addField('Avisado por', `<@${message.author.id}> | ${message.author.id}`)
    .addField('Motivo', reason)
    .setTimestamp();

    let logChannel = message.guild.channels.find(c => c.id === settings.logsChannel);
    if (!logChannel) return;
    logChannel.send(logEmbed);
};

exports.help = {
    name: "avisar",
    aliases: ['aviso', 'warn'],
    categoria: "Moderação",
    descrição: "Dá um aviso ao usuário mencionado.",
    uso: "avisar <usuário> [motivo] | avisar @Near quebrando regras",
    permissões: "Gerenciar mensagens",
    disabled: false
};