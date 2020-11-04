exports.run = async (bot, message, args, settings, member) => {
    let profile = await bot.getBotProfile();
    console.log(`Donos > ${profile.owners}`);
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