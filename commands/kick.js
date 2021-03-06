const Discord = require('discord.js');

exports.run = (bot, message, args, settings) => {
    let toKick = message.mentions.members.first() || message.guild.members.cache.find(u => u.user.id === args[0]) || message.guild.members.cache.find(u => u.user.username === args[0]) || message.guild.members.cache.find(u => `${u.user.username}#${u.user.discriminator}` === args[0]);
    if (!toKick) return message.channel.send('Não foi possível encontrar o usuário!');
    if (toKick.id === "547967082952785933") return message.channel.send("Você tenta kickar o bot! É ineficaz!");
    if (toKick.id === bot.defaults.botOwner) return message.channel.send("Você não pode; ele é forte demais para você.");
    if (toKick.permissions.has('MANAGE_GUILD')) return message.channel.send('Uhh você não pode kickar esse usuário.');
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar servidor.');
    let kickReason = args.slice(1).join();
    if (!kickReason) kickReason = 'Não especificado';

    let kickEmbed = new Discord.MessageEmbed()
    .setTitle('Ação | Kick')
    .setColor('#faff2b')
    .addField('Usuário kickado', `${toKick} | ${toKick.id}`)
    .addField('Kickado por', `<@${message.author.id}> | ${message.author.id}`)
    .addField('Motivo', kickReason)
    .setTimestamp();

    const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.author.id;

    message.channel.send('Tem certeza de que quer kickar esse usuário? (15 segundos)').then(async msg => {

        await msg.react('✅');
        await msg.react('❌');

        msg.awaitReactions(filter, {
            max: 1,
            time: 15000,
            errors: ['time']
        }).then(collected => {
            const reaction = collected.first();
            switch (reaction.emoji.name) {
                case '✅':
                    message.guild.members.kick(toKick, { reason: kickReason });
                    msg.reactions.removeAll();
                    msg.edit('Usuário kickado.').then(m => m.delete(5000));
                    break;
                case '❌':
                    msg.reactions.removeAll();
                    msg.edit(`Certo. Não irei kickar ${toKick.username}.`).then(m => m.delete(5000));
                    break;
            }
        }).catch(e => {
            msg.reactions.removeAll();
            msg.edit('Comando cancelado :/').then(m => m.delete(5000));
        });
    });

    let kickChannel = message.guild.channels.cache.find(c => c.id == settings.channels.logChannel);
    if (!kickChannel) return;
    kickChannel.send(kickEmbed);
};

exports.help = {
    name: "kick",
    aliases: ['kickar', 'k'],
    categoria: "Moderação",
    descrição: "Kicka um usuário do servidor.",
    uso: "kick <usuário> [motivo] | kick Near regra número 1",
    permissões: "Gerenciar servidor",
    disabled: false
};

exports.command = {
    aliases: [],
    description: "Remove um usuário do servidor",
    usage: "kick <usuário> [motivo] | kick Near regra número 69",
    commandPermissions: ['MANAGE_GUILD'],
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