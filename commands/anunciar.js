const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    const toChannel = message.mentions.channels.first() || message.guild.channels.get(args[0]);
    if (!toChannel) return message.channel.send('Não foi possivel encontrar o canal :/');
    const option = args[1];
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Uhh, você precisa de permissão administrativa ou gerenciar servidor.');
    let toMessage = args.slice(2).join(' ');
    const embed = new Discord.RichEmbed()
    .setColor(process.env.INVISIBLE)
    .setDescription(toMessage);
    await message.delete().catch();

    try {
        if (option == 'everyone') {
            toChannel.send('@everyone');
            return toChannel.send(embed);
        } else if (option == 'here') {
            toChannel.send('@here');
            return toChannel.send(embed);
        } else {
            toMessage = args.slice(1).join(' ');
            embed.setDescription(toMessage);
            return toChannel.send(embed);
        }
    } catch (error) {
        return message.channel.send(`Não foi possivel enviar a mensagem no canal. Talvez porque eu não tenha permissões para ver o canal ou enviar mensagens. Enfim, aqui vai um monte de código:\n${error}`);
    }
};

exports.help = {
    name: "anunciar",
    aliases: ['anuncio'],
    categoria: "Servidor",
    descrição: "Faz um anúncio no canal especificado com everyone ou here opcional.",
    uso: "anunciar <canal> [everyone ou here] <conteúdo> | anunciar #anúncios Momento épico de gamer | anunciar #games everyone novo jogo lançado!",
    permissões: "Gerenciar servidor",
    disabled: false
};