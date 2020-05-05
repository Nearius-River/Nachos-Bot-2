const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    console.log('Início do código...');

    let option = args[0];
    let role = args.slice(1).join(' ');
    let findRole = message.guild.roles.cache.find(r => r.name.includes(role)) || message.guild.roles.cache.find(r => r.id == role);
    if (!findRole) return message.channel.send('Não foi possivel encontrar o cargo :/');
    if (findRole.position > message.guild.me.roles.highest.position) return message.channel.send('Esse cargo tem uma posição maior que a minha :/');
    if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar cargos.');

    if (option) {
        console.log('Passando pela escolha de opções...');
        if (option == message.mentions.members.first()) {
            console.log('Passando pela escolha message.mentions.users.first()');
            if (message.mentions.members.first().roles.has(findRole.id)) return message.channel.send('O usuário já tem esse cargo.');
            try {
                message.mentions.members.first().roles.add(findRole.id);
            } catch (error) {
                return message.channel.send('Não foi possivel adicionar o cargo a esse usuário. Tenha certeza de que minha posição é superior ao cargo mencionado.');
            }
            return message.channel.send(`Cargo ${findRole.name} adicionado para ${message.mentions.users.first().tag}.`);
        } if (option == 'todos' || option == '@everyone') {
             if (message.guild.members.cache.size > 15) message.channel.send(`Adicionando cargo para ${message.guild.members.cache.size.toString()} membros. Isso pode levar algum tempo :/`);
            message.guild.members.cache.forEach(async user => {
                if (user.roles.has(findRole.id)) return;
                try {
                    await user.roles.add(findRole.id);
                } catch (error) {
                    return;
                }
            });
        }
    }
};

exports.help = {
    name: "add",
    aliases: ['roles.add', 'addcargo', 'adicionar'],
    categoria: "Moderação",
    descrição: "Adiciona um cargo à um usuário ou à alguns usuários.",
    uso: "add <usuário ou opções> <cargo> | add Near Admin | add todos Membro",
    permissões: "Gerenciar cargos",
    disabled: false
};