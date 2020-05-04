const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let tounmute = message.mentions.members.first() || message.guild.members.find(u => u.user.id === args[0]) || message.guild.members.find(u => u.user.username === args.join(' ')) || message.guild.members.find(u => `${u.user.username}#${u.user.discriminator}` === args.join(' '));
    if(!tounmute) return message.channel.send("Não foi possivel encontrar o usuário!");
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Uhh você precisa ter permissão administrativa ou gerenciar mensagens.");
    let find = tounmute.roles.find(r => r.name === settings.mutedRole);
    if(tounmute.roles.has(find)) return message.channel.send("Essa pessoa não está mutada ou o cargo não existe.");

    await(tounmute.removeRole(find.id));
    message.channel.send(`O usuário ${tounmute} foi desmutado.`);

    let unmuteEmbed = new Discord.RichEmbed()
    .setTitle(`Ação | Unmute`)
    .setColor("#FFFFFF")
    .addField("Usuário desmutado", `<@${tounmute.id}> | ${tounmute.id}`)
    .addField("Desmutado por", `<@${message.author.id}> | ${message.author.id}`)
    .setTimestamp();

    let logChannel = message.guild.channels.find(c => c.id === settings.logsChannel);
    if (!logChannel) return;
    logChannel.send(unmuteEmbed);
};

exports.help = {
    name: "unmute",
    aliases: ['desmutar'],
    categoria: "Moderação",
    descrição: "Remove o mute de um usuário.",
    uso: "unmute <usuário> | unmute @Near",
    permissões: "Gerenciar mensagens",
    disabled: false
};