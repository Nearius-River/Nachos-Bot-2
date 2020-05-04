// const Mongoose = require('mongoose');
// const { Guild, Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    //Profile.deleteMany({ warnings: 0 }).then(console.log('deletados.'));
    return message.channel.send('Comando vazio!');
};

exports.help = {
    name: "test",
    aliases: ['testar', 'teste'],
    categoria: "Desenvolvedor",
    descrição: "Testes",
    uso: "test ? {...} : true",
    permissões: "Desenvolvedor apenas",
    disabled: false
};