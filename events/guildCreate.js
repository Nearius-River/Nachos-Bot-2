const chalk = require('chalk');

module.exports = async (bot, guild) => {
    const newGuild = {guildID: guild.id};

    try {
        return await bot.createGuild(newGuild);
    } catch (err) {
        return console.error(chalk.red(`PERFIL > GUILD | Não foi possivel criar um perfil para a guild "${guild.id}".`) + chalk.cyan(`\n${err}`));
    }
};