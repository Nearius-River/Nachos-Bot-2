exports.run = async (bot, message, args, settings) => {
    console.log('Nada a ser executado.');
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