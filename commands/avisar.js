const { MessageEmbed } = require('discord.js');
const { Profile } = require('../models');
const moment = require('moment');
moment.locale('pt-br');

exports.run = async (bot, message, args, settings) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar mensagens.');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (user.id === "547967082952785933") return message.channel.send("Você tenta avisar o bot! É ineficaz!");
    if (user.id === "303235142283952128") return message.channel.send("Você não pode; ele é forte demais para você.");
    if (user.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Uhh você não pode avisar esse usuário.');
    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'Não especificado';
    if (!user) return message.channel.send('Não foi possível encontrar o usuário!');

    Profile.findOne({userID: user.id}, async (err, result) => {
        if (err) console.error(err);
        result.memberModeration.warningsTotal += 1;
        result.memberModeration.warningsDetail.push(`Moderador: ${message.author.tag} | ${moment(message.createdAt).format('MMM, Do')}\n    ${reason}`);
        result.save();
        message.channel.send(`Certo, ${user.user.tag} foi avisado. Esse é o aviso número ${result.memberModeration.warningsTotal.toString()}`);
    });

    const logEmbed = new MessageEmbed()
    .setColor('#ffe200')
    .setTitle('Ação | Avisar')
    .addField('Usuário avisado', `<@${user.user.id}> | ${user.user.id}`)
    .addField('Avisado por', `<@${message.author.id}> | ${message.author.id}`)
    .addField('Motivo', reason)
    .setTimestamp();

    let logChannel = message.guild.channels.cache.find(c => c.id === settings.channels.logChannel);
    if (!logChannel) return;
    logChannel.send(logEmbed);
};

exports.command = {
    aliases: ['warn'],
    description: "Adiciona um aviso ao perfil do usuário mencionado.",
    usage: "avisar <usuário> [motivo] | avisar Near disse que o big chungus não é engraçado.",
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