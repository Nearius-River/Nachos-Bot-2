const { isNumber } = require("lodash");

exports.run = async (bot, message, args) => {
    const member = message.mentions.members.get(args[0]) ||
    message.guild.members.cache.find(u => u.user.id === args[0]);

    const moneyToAdd = args[1];
    if (!isNumber(moneyToAdd)) return;

    await bot.updateCoins(member, moneyToAdd, true);
    message.channel.send(`Foram adicionados ${moneyToAdd} reais na conta do ${member.user.tag}.`);
};

exports.command = {
    aliases: ['addcash', 'givemoney', 'add-cash', 'give-money', 'add-money'],
    description: "Adiciona uma quantidade de reais a um usuário.",
    usage: "addmoney <usuário> <quantidade>",
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