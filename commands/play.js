const ytdl = require('ytdl-core-discord');
const ytdlcore = require('ytdl-core-discord');

exports.run = async (bot, message, args, settings, member) => {
    // async function playSong(messageChannel, voiceConnection, voiceChannel) {
    //     const stream = ytdl(args[0], { filter: 'audioonly' });
    //     const dispatcher = voiceConnection;
    // }

    // try {
    //     const voiceConnection = await bot.mainServer.channels.cache.get('566654589143744515').join();
    //     await playSong(message.channel, voiceConnection, bot.mainServer.channels.cache.get('566654589143744515'));
    // } catch(err) {
    //     return;
    // }
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