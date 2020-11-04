exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || bot.members.get(args[0]);
    if (!user) return;
    if (!message.author.id !== bot.owners[1].id) return message.channel.send('Opa, esse comando é só para desenvolvedores. Foi mal!');

    let Reactions = ['😎','✌️','😐'];
    const Filter = (Reaction, user) => Reactions.includes(Reaction.emoji.name) && user.id == message.author.id;
    message.channel.send('Adicionar ou remover este usuário dos desenvolvedores?').then(async msg => {
        await msg.react('😎');
        await msg.react('✌️');
        await msg.react('😐');

       msg.awaitReactions(Filter, {
           max: 1,
           time: 30000,
           errors: ['time']
       }).then(Collected => {
            const Reaction = Collected.first();
            switch (Reaction.emoji.name) {
                case '😎':
                    msg.reactions.removeAll();
                    msg.edit(`Beleza, ${user.user.tag} é agora um desenvolvedor!`);
                    bot.updateProfile(user.user, { isDeveloper: true });
                    bot.updateLog(`Novo desenvolvedor adicionado: ${user.id}`);
                    break;
                case '✌️':
                    msg.reactions.removeAll();
                    msg.edit(`Beleza, ${user.user.tag} foi removido dos desenvolvedores.`);
                    bot.updateProfile(user.user, { isDeveloper: false });
                    bot.updatelog(`Desenvolvedor removido: ${user.id}`);
                    break;
                case '😐':
                    msg.reactions.removeAll();
                    msg.edit(`Certo, cancelando comando.`).then(m => m.delete(5000));
                    break;
            }
       }).catch(() => {
           msg.reactions.removeAll();
           msg.edit('Comando cancelado.').delete(5000);
       });
    });
};

exports.command = {
    aliases: [],
    description: "Adiciona ou remove status de desenvolvedor de um usuário.",
    usage: "attdev <usuário> <lista de opções com emoji> | attdev Monika [Sim | Não | Cancelar]",
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