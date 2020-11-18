exports.run = async (bot, message, args, settings, getGuildValue) => {
    let member = getGuildValue('member', args.join(' '));
    bot.memberIs(member, 'owner').then(result => {
        if (result == true) {
            message.channel.send('É admin');
        } else {
            message.channel.send('Não é admin');
        }
    });
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