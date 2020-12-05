const Discord = require('discord.js');

exports.run = (bot, message, args, settings) => {
    let toBan = message.mentions.members.first() || message.guild.members.cache.find(u => u.user.id === args[0]) || message.guild.members.cache.find(u => u.user.username === args[0]) || message.guild.members.cache.find(u => `${u.user.username}#${u.user.discriminator}` === args[0]);
    if(!toBan) return message.channel.send('Não foi possível encontrar o usuário!');
    if(toBan.id === "547967082952785933") return message.channel.send("Você tenta banir o bot! É ineficaz!");
    if(toBan.id === "303235142283952128") return message.channel.send("Você não pode; ele é forte demais para você.");
    let banReason = args.slice(1).join(' ');
    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("Uhh você precisa ter permissão administrativa ou gerenciar servidor.");
    if(toBan.permissions.has("MANAGE_GUILD")) return message.channel.send("Uhh essa pessoa não pode ser banida.");
    if(!banReason) banReason = "Não especificado";

    let banEmbed = new Discord.MessageEmbed()
    .setTitle('Ação | Ban')
    .setColor('faff2b')
    .addField('Usuário banido', `${toBan} | ${toBan.id}`)
    .addField('Banido por', `<@${message.author.id}> | ${message.author.id}`)
    .addField('Motivo', banReason)
    .setTimestamp();

    const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.author.id;

    message.channel.send('Tem certeza de que quer banir esse usuário? (15 segundos)').then(async msg => {

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
                    message.guild.members.ban(toBan, { reason: banReason });
                    msg.reactions.removeAll();
                    msg.edit('Usuário banido.').then(m => m.delete(5000));
                    break;
                case '❌':
                    msg.reactions.removeAll();
                    msg.edit(`Certo. Não irei banir ${toBan.username}.`).then(m => m.delete(5000));
                    break;
            }
        }).catch(e => {
            msg.reactions.removeAll();
            msg.edit('Comando cancelado :/').then(m => m.delete(5000));
        });
    });

    let banChannel = message.guild.channels.cache.find(c => c.id == settings.channels.logChannel);
    banChannel.send(banEmbed);
};

exports.command = {
    aliases: [],
    description: "Bane um usuário do servidor.",
    usage: "ban <usuário> [motivo] | ban Near sadboyolagem",
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