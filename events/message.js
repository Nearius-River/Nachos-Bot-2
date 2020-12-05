const chalk = require("chalk");

module.exports = async (bot, message) => {
    if (message.author.bot || message.channel.type == 'dm') return;
    //' If message author is a bot or message is in a DM channel, return nothing '//
    //# Before prefix check #//

    let settings;
    try {
        settings = await bot.getGuild(message.guild);
        //' Main bot settings for guild (prefix, log channel etc) '//
    } catch (e) {
        return;
    }

    if (settings == undefined) {
        return message.channel.send('Ajustando as configurações para a guilda... Você já deve poder usar comandos agora.');
    }

    const prefix = settings.prefix || '*';
    if (message.content.startsWith(`<@!${bot.user.id}>`)) message.channel.send(`Querendo ajuda? meu prefixo nesse servidor é \`${prefix}\`.\nCaso queira ver uma lista de comandos, digite \`${prefix}comandos\` ou \`${prefix}cmds\`.`);
    //' Make the bot reply with useful info if message starts with bot mention '//

    const memberProfile = await bot.getMemberProfile(message.member);
    const userProfile = await bot.getUserProfile(message.member);
    if (!memberProfile || !userProfile) return message.member.send('Criando seu perfil para "' + message.guild.name + '". Você já deve poder usar comandos agora.');

    updateCoinsAndExperience(bot, message);

    //' Consider changing to bot database later '//
    bot.owners = ['303235142283952128','630456490540400703','693676638373937182']; //' Setting bot owners id '//
    bot.mainServer = bot.guilds.cache.get('538548215914561537'); //' Development server '//
    bot.mainLogChannel = bot.mainServer.channels.cache.get('686761678247165955'); //' Channel for bot-related logs '//

    //# Prefix check #//
    if (message.content.indexOf(settings.prefix) !== 0) return;
    let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);

    let commandName = args.shift().toLowerCase();
    let cmd;
    if (bot.commands.has(commandName)) {
        cmd = bot.commands.get(commandName);
    } else if (bot.aliases.has(commandName)) {
        cmd = bot.commands.get(bot.aliases.get(commandName));
    } else {
        return;
    }

    if (cmd.command.disabled == true && !bot.memberIs(message.member, 'developer')) return message.channel.send('Opa, foi mal! Este comando está em manutenção!');
    //' If 'exports.command.disabled' is set to true on a command,
    //' don't execute the command and return something
    if (cmd.command.commandPermissions.length > 0 ) {
        let permissions = cmd.command.commandPermissions;
        if (permissions.includes('OWNER') && !await bot.memberIs(message.member, 'owner')) return message.channel.send('Hmm... Parece que você não pode usar isso.');
        else if (permissions.includes('DEVELOPER') && !await bot.memberIs(message.member, 'developer')) return message.channel.send('Hmm... Parece que você não pode usar isso.');

        if (!permissions.includes('OWNER') && !permissions.includes('DEVELOPER') && !message.member.permissions.has(permissions)) {
            return message.channel.send('Parece que você não pode usar isso. Tenha certeza de ter as seguintes permissões: `' + permissions.join(', ') + '`.');
        }
    }
    //' Permission checking '//
    if (userProfile.botBlacklist == true && !await bot.memberIs(message.member, 'developer')) return;
    //' If message author is blacklisted, return nothing '//

    try {
        cmd.run(bot, message, args, settings); //' Executes the command '//
        bot.increaseCommandCount();
    } catch (e) {
        return message.channel.send('Um eggrro ocorreu:\n' + '```js' + e + '```');
    }
};

async function updateCoinsAndExperience(bot, message) {
    const moneyIncreaseChance = Math.floor(Math.random() * 16) + 1;
    const amountMoney = Math.floor(Math.random() * 4) + 1;
    const amountExperience = Math.floor(Math.random() * 20) + 5;

    if (moneyIncreaseChance >= 2 && moneyIncreaseChance <= 10) {
        try {
            await bot.updateCoins(message.member, amountMoney);
        } catch (e) {
            console.error(chalk.red(`PERFIL > USUÁRIO | Ocorreu um erro ao tentar atualizar os valores de "${message.author.id}".\n`) + chalk.cyan(`${e}`));
        }
    }

    await bot.updateExperience(message.member, amountExperience);
}