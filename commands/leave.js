exports.run = async (bot, message, args) => {
    bot.voice.connections.map(voiceChannel => {
        if (voiceChannel.channel.members.find(message.guild.me.user.id)) {
            voiceChannel.disconnect();
        }
    });
};

exports.command = {
    aliases: ['exit'],
    description: "Desconecta o bot de algum canal de voz, caso esteja em um.",
    usage: "",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: false,
        music: true,
        development: false
    },
    disabled: true
};