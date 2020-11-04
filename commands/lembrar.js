const ms = require('ms');

exports.run = async (bot, message, args, settings, member) => {
    const time = args[0];
    if (!time || time < 1) {
        return message.channel.send('Tem algo errado no tempo.');
    }
    let reminder = args.slice(1).join(' ');
    if (!reminder) reminder = 'Não especificado';

    try {
        message.channel.send('Certo, eu irei te lembrar ' + ms(ms(time)) + ' daqui.');
        setTimeout(function() {
            member.send('Opa, você disse pra eu te lembrar. Certo, seu lembrete é...\n' + reminder);
        }, ms(time));
    } catch (e) {
        return message.channel.send('Tem algo errado no tempo.');
    }
};

exports.command = {
    aliases: ['remind'],
    description: "Define um lembrete para você. Quando o tempo chegar, o bot irá mandar uma mensagem no seu PV.",
    usage: "lembrar <tempo> [lembrete] | lembrar 70m correr | lembrar 2h almoçar",
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