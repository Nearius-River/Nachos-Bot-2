const { RichEmbed } = require('discord.js');

exports.run = async (bot, message, args, settings, user, send) => {

};

exports.help = {
    name: "math",
    aliases: ['calculo', 'calc', 'calcular'],
    categoria: "Outros",
    descrição: "Realiza uma expressão matemática.",
    uso: "math <expressão> | math 2424 + 4848",
    permissões: "Nenhuma",
    disabled: true
};