exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.get(args[0]) || bot.members.get(args[0]);
    if (!user) return;
    if (bot.getProfile(user).isDeveloper != true) return message.channel.send('Opa, esse comando é só para desenvolvedores. Foi mal!');

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
                    msg.clearReactions();
                    msg.edit(`Entendido. ${user.user.tag} foi banido para o Shadow Realm.`);
                    bot.updateProfile(user.user, { isBlacklisted: true });
                    break;
                case '✌️':
                    msg.clearReactions();
                    msg.edit(`Entendido. ${user.user.tag} foi salvo do Shadow Realm.`);
                    bot.updateProfile(user.user, { isBlacklisted: false });
                    break;
                case '😐':
                    msg.clearReactions();
                    msg.edit('Entendido. Cancelando comando...').then(m => m.delete(5000));
                    break;
            }
        }).catch(() => {
            msg.clearReactions();
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