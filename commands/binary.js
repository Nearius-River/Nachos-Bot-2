const binary = require('decode-encode-binary');

exports.run = async (bot, message, args) => {
    let BinaryCode = args.join(' ');
    if (!BinaryCode) return message.channel.send('Por favor, digite um texto para ser convertido ou código para ser decodificado.');
    message.channel.send('Convertido com sucesso! Resultado: ' + '`' + binary.auto(BinaryCode, true) + '`');
};

exports.command = {
    aliases: [],
    description: "Converte texto para código binário e vice-versa.",
    usage: "binary <texto ou código binário> | binary Toper | binary 01100001",
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