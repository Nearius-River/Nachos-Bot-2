const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let option = args[0];
    let role = args.slice(1).join(' ');
    let findRole = message.guild.roles.find(r => r.name.includes(role)) || message.guild.roles.find(r => r.id == role);
    if (!findRole) return message.channel.send('Não foi possivel encontrar o cargo :/');
    if (findRole.position > message.guild.me.highestRole.position) return message.channel.send('Esse cargo tem uma posição maior que a minha :/');
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar cargos.');

    if (option) {
        if (option == message.mentions.users.first()) {
            if (!message.mentions.members.first().roles.has(findRole.id)) return message.channel.send('O usuário não tem esse cargo.');
            try {
                message.mentions.members.first().removeRole(findRole.id);
            } catch (error) {
                return message.channel.send('Não foi possivel remover o cargo desse usuário. Tenha certeza de que minha posição é superior ao cargo mencionado.');
            }

            return message.channel.send(`Cargo ${findRole.name} removido de ${message.mentions.users.first().tag}.`);
        } if (option == 'todos' || option == '@everyone') {
            if (message.guild.members.size > 15) message.channel.send(`Removendo cargo para ${message.guild.members.size.toString()} membros. Isso pode levar algum tempo :/`);
            message.guild.members.forEach(async user => {
                if (!user.roles.has(findRole.id)) return;
                try {
                    await user.removeRole(findRole.id);
                } catch (error) {
                    return;
                }

            });
        }
    }
};

exports.help = {
    name: "remover",
    aliases: ['remrole', 'removercargo'],
    categoria: "Moderação",
    descrição: "Remove um cargo de um usuário ou de alguns usuários.",
    uso: "remover <usuário ou opções> <cargo> | remover Near Admin | remover todos Membro",
    permissões: "Gerenciar cargos",
    disabled: false
};