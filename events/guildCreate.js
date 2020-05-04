module.exports = async (bot, guild) => {

    const newGuild = {
        guildID: guild.id,
        guildName: guild.name,
        ownerID: guild.ownerID,
        ownerUsername: guild.owner.user.tag,
        cases: 0
    };

    try {
        await bot.createGuild(newGuild);
    } catch (error) {
        console.error(`GUILD | Não foi possivel criar um perfil para a guild "${guild.id}".`.error + `\n${error}`.warn);
    }
};