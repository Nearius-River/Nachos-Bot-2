const { MessageEmbed } = require('discord.js');
const binary = require('decode-encode-binary');

exports.run = async (bot, message, args, settings, user, send) => {
    let BinaryCode = args.join(' ');
    if (!BinaryCode) return send('Por favor, digite um texto para ser convertido ou código para ser decodificado.');
    send('Convertido com sucesso! Resultado: ' + '`' + binary.auto(BinaryCode, true) + '`');
};

exports.help = {
    name: "binary",
    aliases: ['binario'],
    categoria: "Outros",
    descrição: "Codifica texto para código binário e vice-versa.",
    uso: "binary <texto ou código binário> | binary Toper | binary 01100001",
    permissões: "Nenhuma",
    disabled: false
};