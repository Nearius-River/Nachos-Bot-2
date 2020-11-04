const { MessageEmbed } = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    console.log(bot.owner.id);
    if (!args[1]) return message.channel.send('Muitos poucos detalhes providenciados. Tenha certeza de dar o máximo de detalhes possiveis quando usar esse comando.');
    const embed = new MessageEmbed()
    .setColor('#ff4f4f')
    .setAuthor(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL())
    .setDescription(args.join(' '))
    .setTimestamp();

	await message.delete().catch();
	message.channel.send('Certo... Denúncia de bug enviada com sucesso ao desenvolvedor!');

    bot.users.cache.get('303235142283952128').send(embed);
};

exports.command = {
    aliases: [],
    description: "Usado para reportar algum bug/erro encontrado. Tente sempre incluir o máximo de detalhes possiveis, preferivelmente uma screenshot do problema.",
    usage: "bugreport <detalhes> | bugreport Isso aparece quando eu uso o comando x (...)",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: true,
        music: false,
        development: false
    },
    disabled: false
};