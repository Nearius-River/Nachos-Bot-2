const chalk = require('chalk');

module.exports = async (bot, member) => {
    const newProfile = {
        guildID: member.guild.id,
        userID: member.id,
    };

    try {
        return await bot.createMemberProfile(newProfile);
    } catch (err) {
        return console.error(chalk.red(`PERFIL > USUÁRIO | Não foi possivel criar um perfil para o usuário "${member.id}".`) + chalk.cyan(`\n${err}`));
    }
};