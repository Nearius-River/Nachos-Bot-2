const { MessageEmbed } = require('discord.js');
const binary = require('decode-encode-binary');

exports.run = async (bot, message, args) => {
    let BinaryCode = args.join(' ');
    if (!BinaryCode) return message.channel.send('Por favor, digite um texto para ser convertido ou código para ser decodificado.');
    message.channel.send('Convertido com sucesso! Resultado: ' + '`' + binary.auto(BinaryCode, true) + '`');
};

exports.help = {
    name: "binary",
    aliases: ['binario'],
    categoria: "Outros",
    descrição: "Converte texto para código binário e vice-versa.",
    uso: "binary <texto ou código binário> | binary Toper | binary 01100001",
    permissões: "Nenhuma",
    disabled: false
};