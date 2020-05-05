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
                    bot.updateProfile(user.user, { isBlacklisted: true });
                    break;
                case '✌️':
                    msg.reactions.removeAll();
                    msg.edit(`Entendido. ${user.user.tag} foi salvo do Shadow Realm.`);
                    bot.updateProfile(user.user, { isBlacklisted: false });
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

exports.help = {
    name: "blacklist",
    aliases: ['shadowrealm', 'byebye'],
    categoria: "Desenvolvedor",
    descrição: "Adiciona ou remove um usuário da blacklist.",
    uso: "blacklist <usuário>",
    permissões: "Desenvolvedor apenas",
    disabled: false
};