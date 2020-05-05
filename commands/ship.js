const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let user1 = message.guild.members.cache.get(args[0]);
    let user2 = message.guild.members.cache.get(args[1]);
    if (!user1 || !user2) return message.channel.send('Não foi possível encontrar o usuário :/');

    const nameCalc = user1.user.username.substring(0,user1.user.username.length / 2 + 1) + user2.user.username.slice(user2.user.username.length / 2);
	const nicknameCalc = user1.nickname.substring(0,user1.nickname.length / 2 + 1) + user2.nickname.slice(user2.nickname.length / 2);

    message.channel.send(`${user1.user.username} + ${user2.user.username} = ${nameCalc}`);
	message.channel.send(`${user1.nickname} + ${user2.nickname} = ${nicknameCalc}`);
};

exports.help = {
    name: "ship",
    aliases: ['shippar', 'match'],
    categoria: "Diversão",
    descrição: "O amor está no ar! Calcule o nível de paixão de 2 usuários.",
    uso: "ship <usuário 1> <usuário 2> | ship Near Yuri",
    permissões: "Nenhuma",
    disabled: false
};