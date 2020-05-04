const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    if (!bot.isOwner(message.author)) return message.channel.send('Uhh apenas o desenvolvedor pode usar esse comando.');
    let embed = new Discord.RichEmbed()
    .setColor('#36393F');

    const code = args.join(" ");
    if (['bot.token', 'process.env.token', 'token'].includes(code)) return message.channel.send('Achou que seria tão fácil assim?');

    try {
        let evaled = eval(code);
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        message.delete();
        embed.setTitle('Evaluação completa!');
        embed.setDescription(`Entrada:\n\`\`\`${message.content}\`\`\`\nSaida:\n\`\`\`js\n${bot.clean(evaled)}\n\`\`\``);
        message.channel.send(embed);
      } catch (err) {
        message.channel.send(`\`Oops, um erro ocorreu!\` \`\`\`xl\n${bot.clean(err)}\n\`\`\``);
      }
};

exports.help = {
    name: "eval",
    aliases: ['evaluar', 'evaluate'],
    categoria: "Desenvolvedor",
    descrição: "Executa um código em JavaScript.",
    uso: "eval <código>",
    permissões: "Desenvolvedor apenas",
    disabled: false
};