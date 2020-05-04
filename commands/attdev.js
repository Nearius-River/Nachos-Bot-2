exports.run = async (bot, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.get(args[0]) || bot.members.get(args[0]);
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
                    msg.clearReactions();
                    msg.edit(`Beleza, ${user.user.tag} é agora um desenvolvedor!`);
                    bot.updateProfile(user.user, { isDeveloper: true });
                    bot.updateLog(`Novo desenvolvedor adicionado: ${user.id}`);
                    break;
                case '✌️':
                    msg.clearReactions();
                    msg.edit(`Beleza, ${user.user.tag} foi removido dos desenvolvedores.`);
                    bot.updateProfile(user.user, { isDeveloper: false });
                    bot.updatelog(`Desenvolvedor removido: ${user.id}`);
                    break;
                case '😐':
                    msg.clearReactions();
                    msg.edit(`Certo, cancelando comando.`).then(m => m.delete(5000));
                    break;
            }
       }).catch(() => {
           msg.clearReactions();
           msg.edit('Comando cancelado.').delete(5000);
       });
    });
};

exports.help = {
    name: "attdev",
    aliases: ['atualizardev'],
    categoria: "Desenvolvedor",
    descrição: "Adiciona ou remove status de desenvolvedor de um usuário.",
    uso: "attdev <usuário> <lista de opções com emoji> | attdev Monika [Sim | Não | Cancelar]",
    permissões: "Desenvolvedor apenas.",
    disabled: false
};