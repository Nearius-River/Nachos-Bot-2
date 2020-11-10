exports.run = async (bot, message, args, settings, getGuildValue) => {
    let member = getGuildValue('member', args.join(' '));
    message.channel.send('Obteve', member.user.id, '(', member.user.username, ')');
};

exports.command = {
    aliases: [],
    description: "Testes. Poderia ser mais explicativo que isso?",
    usage: "test ?<[...]>",
    commandPermissions: ['DEVELOPER'],
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