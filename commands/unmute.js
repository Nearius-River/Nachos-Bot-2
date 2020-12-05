const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let tounmute = message.mentions.members.first() || message.guild.members.cache.find(u => u.user.id === args[0]) || message.guild.members.cache.find(u => u.user.username === args.join(' ')) || message.guild.members.cache.find(u => `${u.user.username}#${u.user.discriminator}` === args.join(' '));
    if(!tounmute) return message.channel.send("Não foi possivel encontrar o usuário!");
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Uhh você precisa ter permissão administrativa ou gerenciar mensagens.");
    let find = tounmute.roles.find(r => r.name === settings.roles.mutedRole);
    if(tounmute.roles.has(find)) return message.channel.send("Essa pessoa não está mutada ou o cargo não existe.");

    await(tounmute.roles.remove(find.id));
    message.channel.send(`O usuário ${tounmute} foi desmutado.`);

    let unmuteEmbed = new Discord.MessageEmbed()
    .setTitle(`Ação | Unmute`)
    .setColor("#FFFFFF")
    .addField("Usuário desmutado", `<@${tounmute.id}> | ${tounmute.id}`)
    .addField("Desmutado por", `<@${message.author.id}> | ${message.author.id}`)
    .setTimestamp();

    let logChannel = message.guild.channels.cache.find(c => c.id === settings.channels.logChannel);
    if (!logChannel) return;
    logChannel.send(unmuteEmbed);
};

exports.command = {
    aliases: [],
    description: "Remove o mute de um usuário, caso esteja mutado.",
    usage: "unmute <usuário> | unmute Near",
    commandPermissions: ['MANAGE_MESSAGES'],
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