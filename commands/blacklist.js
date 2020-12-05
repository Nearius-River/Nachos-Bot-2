exports.run = async (bot, message, args) => {
    if (!bot.owners.includes(message.author.id)) return message.channel.send('Opa, esse comando é só para desenvolvedores. Foi mal!');
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || bot.members.get(args[0]);
    if (!user) return;

    let Reactions = ['👋','✌️','😐'];
    const Filter = (Reaction, user) => Reactions.includes(Reaction.emoji.name) && user.id == message.author.id;
    message.channel.send('Banir ou salvar este usuário da shadow realm?').then(async msg => {
        await msg.react('👋');
        await msg.react('✌️');
        await msg.react('😐');

        msg.awaitReactions(Filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(Collected => {
            const Reaction = Collected.first();
            switch (Reaction.emoji.name) {
                case '👋':
                    msg.reactions.removeAll();
                    msg.edit(`Entendido. ${user.user.tag} foi banido para o Shadow Realm.`);
                    bot.updateMemberProfile(user.user, { botBlacklist: true });
                    break;
                case '✌️':
                    msg.reactions.removeAll();
                    msg.edit(`Entendido. ${user.user.tag} foi salvo do Shadow Realm.`);
                    bot.updateMemberProfile(user.user, { botBlacklist: false });
                    break;
                case '😐':
                    msg.reactions.removeAll();
                    msg.edit('Entendido. Cancelando comando...').then(m => m.delete(5000));
                    break;
            }
        }).catch(() => {
            msg.reactions.removeAll();
            msg.edit('O tempo acabou.').then(m => m.delete(5000));
        });
    });
};

exports.command = {
    aliases: ['shadowrealm'],
    description: "Adiciona ou remove um usuário da blacklist.",
    usage: "blacklist <usuário>",
    commandPermissions: ['OWNER'],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: false,
        music: false,
        development: true
    },
    disabled: false
};