const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    if (!bot.owners.includes(message.author.id)) return message.channel.send('Opa, foi mal! Esse comando é só para desenvolvedoress.');
    let embed = new Discord.MessageEmbed()
    .setColor('#36393F')
	.setFooter('Clique na reação em 60 segundos para deletar se for preciso.');

    const code = args.join(" ");
    if (['bot.token', 'bot.defaults.botToken', 'token'].includes(code)) return message.channel.send('Achou que seria tão fácil assim?');

    const Reactions = ['❌'];
    const Filter = (reaction, user) => Reactions.includes(reaction.emoji.name) && user.id == message.author.id;

    try {
        let evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        message.delete();
        embed.setTitle('Executado com sucesso!');
        embed.setDescription(`Entrada:\n\`\`\`${message.content}\`\`\`\nSaida:\n\`\`\`js\n${bot.clean(evaled)}\n\`\`\``);
        message.channel.send(embed).then(async msg => {
            await msg.react('❌');

            msg.awaitReactions(Filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(() => {
                msg.reactions.removeAll();
                msg.delete({ timeout: 1000 });
            }).catch(() => {
                msg.reactions.removeAll().catch();
                embed.setFooter(' ');
            });
        });
      } catch (err) {
		message.delete();
		embed.setTitle('Oops, um erro ocorreu!');
		embed.setDescription(`Entrada:\n\`\`\`${message.content}\`\`\`\nErro:\n\`\`\`js\n${bot.clean(err)}\n\`\`\``);
        return message.channel.send(embed).then(async msg => {
            await msg.react('❌');

            msg.awaitReactions(Filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(() => {
                msg.reactions.removeAll();
                msg.delete().catch(() => { return; });
            }).catch(() => {
                msg.reactions.removeAll().catch();
                embed.setFooter(' ');
            });
        });
      }
};

exports.command = {
    aliases: [],
    description: "Executa um código em JavaScript.",
    usage: "eval <código>",
    commandPermissions: ['OWNER'],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: false,
        music: false,
        development: true
    },
    disabled: false
};