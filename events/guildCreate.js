module.exports = async (bot, guild) => {
    const newGuild = {
        guildID: guild.id,
        ownerID: guild.ownerID,
        prefix: '*',
        cases: 0
    };

    try {
        await bot.createGuild(newGuild);
    } catch (err) {
        console.error(`PERFIL > GUILD | Não foi possivel criar um perfil para a guild "${guild.id}".`.error + `\n${err}`.warn);
    }
};