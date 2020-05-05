module.exports = async (bot, member) => {
    const newProfile = {
        guildID: member.guild.id,
        userID: member.id,
        userWarnings: {
            warningsTotal: 0,
            warningsDetail: [],
        },
        isBlacklisted: false,
    };

    try {
        await bot.createProfile(newProfile);
    } catch (err) {
        console.error(`PERFIL > USUÁRIO | Não foi possivel criar um perfil para o usuário "${member.id}".`.error + `\n${err}`.warn);
    }
};