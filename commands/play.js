const ytdl = require('ytdl-core-discord');

exports.run = async (bot, message, args) => {
    let member = message.member;
    let channelToJoin = member.voice.channel;

    if (!channelToJoin) return message.channel.send('É preciso entrar em um canal de voz primeiro.');

    if (channelToJoin.joinable == true &&
        channelToJoin.speakable == true) {
        try {
			message.channel.send('Entrei no canal, reproduzindo agora `' + args[0] + '`');
            channelToJoin.join();
        } catch (err) {
            return message.channel.send('Não consegui entrar no canal `' + channelToJoin.name + '`! Tenha certeza que tenho todas as permissões necessárias.\nMensagem de erro: `' + err + '`' );
        }
    } else {
        return message.channel.send('Não consegui entrar no canal! Tenha certeza que tenho as seguintes permissões: `entrar no canal`, e `falar no canal`.');
    }

    await play(bot.voice.createBroadcast(), args[0]);

    async function play(connection, url) {
        if (!ytdl.validateURL(url)) return;
        return connection.play(await ytdl(url), { type: 'opus' });
    }
};

exports.command = {
    aliases: [],
    description: "Reproduz alguma música do YouTube.",
    usage: "play <link>",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: false,
        music: true,
        development: false
    },
    disabled: false
};