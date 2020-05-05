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

exports.help = {
    name: "bugreport",
    aliases: ['reportbug'],
    categoria: "Outros",
    descrição: "Encontrou um erro no bot? Algum bug? Use esse comando para reportar para o desenvolvedor (por favor, não abuse do comando).",
    uso: "bugreport <detalhes> | bugreport Isso aparece quando eu uso o comando...",
    permissões: "Nenhuma",
    disabled: false
};