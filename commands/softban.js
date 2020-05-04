const { RichEmbed } = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let toBan = message.mentions.members.first() || message.guild.members.get(args[0]);
    let banReason = args.slice(1).join(' ');
    if(!toBan) return message.channel.send('Não foi possível encontrar o usuário!');
    if(toBan.id === "547967082952785933") return message.channel.send("Você tenta banir o bot! É ineficaz!");
    if(toBan.id === "303235142283952128") return message.channel.send("Você não pode; ele é forte demais para você.");
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Uhh você precisa ter permissão administrativa ou gerenciar servidor.");
    if(toBan.hasPermission("MANAGE_GUILD")) return message.channel.send("Uhh essa pessoa não pode ser banida.");
    if(!banReason) banReason = "Não especificado";

    let banEmbed = new RichEmbed()
    .setTitle('Ação | Soft-ban')
    .setColor('faff2b')
    .addField('Usuário soft-banido', `${toBan} | ${toBan.id}`)
    .addField('Soft-banido por', `<@${message.author.id}> | ${message.author.id}`)
    .addField('Motivo', banReason)
    .setTimestamp();

    const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id == message.author.id;

    message.channel.send('Tem certeza de que quer soft-banir esse usuário? (15 segundos)').then(async msg => {

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
                    toBan.ban(banReason, 7).then(toBan.unban('Desbanimento automático por Nachos Bot'));
                    msg.clearReactions();
                    msg.edit('Usuário soft-banido.').then(m => m.delete(5000));
                    break;
                case '❌':
                    msg.clearReactions();
                    msg.edit(`Certo. Não irei soft-banir ${toBan.username}.`).then(m => m.delete(5000));
                    break;
            }
        }).catch(e => {
            msg.clearReactions();
            msg.edit('Comando cancelado :/').then(m => m.delete(5000));
        });
    });

    let banChannel = message.guild.channels.find(c => c.id == settings.logsChannel);
    banChannel.send(banEmbed);
};

exports.help = {
    name: "softban",
    aliases: [],
    categoria: "Moderação",
    descrição: "Bane um usuário e em seguida, o desbane. Útil para limpar mensagens enviadas pelo usuário.",
    uso: "softban <usuário> [motivo] | softban Near spam & flood",
    permissões: "Gerenciar servidor",
    disabled: false
};