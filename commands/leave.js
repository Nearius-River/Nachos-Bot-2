exports.run = async (bot, message, args, settings, member) => {
    bot.mainServer.channels.cache.get('566654589143744515').disconnect();
};

exports.command = {
    aliases: ['exit'],
    description: "Desconecta o bot de algum canal, caso esteja em um.",
    usage: "",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: false,
        music: true,
        development: false
    },
    disabled: true
};