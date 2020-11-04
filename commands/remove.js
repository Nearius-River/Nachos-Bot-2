const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let option = args[0];
    let role = args.slice(1).join(' ');
    let findRole = message.guild.roles.cache.find(r => r.name.includes(role)) || message.guild.roles.cache.find(r => r.id == role);
    if (!findRole) return message.channel.send('Não foi possivel encontrar o cargo :/');
    if (findRole.position > message.guild.me.roles.highest.position) return message.channel.send('Esse cargo tem uma posição maior que a minha :/');
    if (!message.member.permissions.has('MANAGE_ROLES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar cargos.');

    if (option) {
        if (option == message.mentions.users.first()) {
            if (!message.mentions.members.first().roles.has(findRole.id)) return message.channel.send('O usuário não tem esse cargo.');
            try {
                message.mentions.members.first().roles.remove(findRole.id);
            } catch (error) {
                return message.channel.send('Não foi possivel remover o cargo desse usuário. Tenha certeza de que minha posição é superior ao cargo mencionado.');
            }

            return message.channel.send(`Cargo ${findRole.name} removido de ${message.mentions.users.first().tag}.`);
        } if (option == 'todos' || option == '@everyone') {
            if (message.guild.members.cache.size > 15) message.channel.send(`Removendo cargo para ${message.guild.members.cache.size.toString()} membros. Isso pode levar algum tempo :/`);
            message.guild.members.cache.forEach(async user => {
                if (!user.roles.has(findRole.id)) return;
                try {
                    await user.roles.remove(findRole.id);
                } catch (error) {
                    return;
                }

            });
        }
    }
};

exports.command = {
    aliases: ['removerole', 'remove-role', 'remrole'],
    description: "Retira um cargo de um usuário ou de alguns usuários.",
    usage: "remove <usuário ou opções> <cargo> | remover Near Admin | remover todos Membro",
    commandPermissions: ['MANAGE_ROLES'],
    commandCategory: {
        administration: true,
        information: false,
        economy: false,
        util: false,
        music: false,
        development: false
    },
    disabled: false
};