const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-br');

exports.run = async (bot, message, args) => {
    let role = args.join(' ');
    let findRole = message.guild.roles.find(r => r.name.includes(role) || r.id == role);
    if (!findRole || !args[0]) return message.channel.send('Não foi possivel encontrar esse cargo :/');
    let embed = new Discord.RichEmbed()
    .setColor(findRole.hexColor)
    .setTitle(`${findRole.name} | ${findRole.id}`);


    if (findRole) {
        if (findRole.hexColor == '#000000') {
            embed.setColor('#99AAB5');
            embed.addField('Cor (hex)', 'Padrão');
        } else {
            embed.addField('Cor (hex)', findRole.hexColor);
        }
        embed.addField('Criado em', moment(findRole.createdAt).format('lll'));
        embed.addField('Posição', `${findRole.position}/${message.guild.roles.size - 1}`);
        if (findRole.hoist == true) {
            embed.addField('Exibe separadamente', 'Sim');
        } else {
            embed.addField('Exibe separadamente', 'Não');
        }
        if (findRole.mentionable == true) {
            embed.addField('Mencionável', 'Sim');
        } else {
            embed.addField('Mencionável', 'Não');
        }
        if (findRole.members.size == 0) embed.addField('Membros', 'Nenhum');
        if (findRole.members.size > 0 && findRole.members.size <= 100) {
            embed.addField(`Membros (${findRole.members.size})`, findRole.members.map(m => m.user.tag).join(', '));
        } else if (findRole.members.size > 100) embed.addField(`Membros (${findRole.members.size})`, 'Muitos membros');
        embed.addField('Permissões', new Discord.Permissions(findRole.permissions));
    }

    message.channel.send(embed);
};

exports.help = {
    name: "roleinfo",
    aliases: [],
    categoria: "Informação",
    descrição: "Visualiza informações sobre um cargo.",
    uso: "roleinfo <cargo> | roleinfo Membro",
    permissões: "Nenhuma",
    disabled: false
};