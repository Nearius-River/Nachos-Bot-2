exports.run = async (bot, message, args, member) => {
    try {
        bot.guilds.cache.forEach(guild => {
            if (guild.members.cache.get(member.id)) {
                message.channel.send(`Ele tá na guild \`${guild.name}!\` comigo!`);
            }
        });
    } catch (e) {
        return;
    }
};

exports.help = {
    name: "emcomum",
    aliases: ['servidorescompartilhdos', 'sharedservers'],
    descrição: "Mostra uma lista de servidores compartilhados entre o usuário e o bot.",
    uso: "emcomum <usuário> | emcomum Near",
    permissões: "Nenhuma",
    disabled: false
};

exports.command = {
    aliases: ['sharedservers'],
    description: "Mostra uma lista de servidores compartilhados entre o usuário e o bot.",
    usage: "emcomum <usuário> | emcomum Near",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: true,
        music: false,
        development: false
    },
    disabled: false
};