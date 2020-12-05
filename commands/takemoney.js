const { isNumber } = require("lodash");

exports.run = async (bot, message, args, settings) => {
    const member = message.mentions.members.get(args[0]) ||
    message.guild.members.cache.find(u => u.user.id === args[0]);

    const moneyToTake = args[1];
    if (!isNumber(moneyToTake)) return;

    message.channel.send(`Foram removidos ${moneyToTake} reais da conta do ${member.user.tag}.`);
};

exports.command = {
    aliases: ['take-money', 'removecash', 'remove-cash', 'delmoney', 'del-money'],
    description: "Remove uma quantidade de reais de um usuário.",
    usage: "removemoney <usuário> <quantidade>",
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