module.exports = async (bot, message) => {
    if (message.author.bot || message.channel.type == 'dm') return; /////////////' If message author is a bot or message is in a DM channel, return nothing '//

	let settings;
    try {
        settings = await bot.getGuild(message.guild);
    } catch (e) {
        console.error(e);
    } //' Main bot settings for guild (prefix, log channel etc) '//

    const prefix = settings.prefix;

    const newProfile = {
        userID: message.author.id,
        userWarnings: {
            warningsTotal: 0,
            warningsDetail: [],
        },
        isBlacklisted: false,
    };

    const userProfile = await bot.getProfile(message.author);
    if (!userProfile) return await bot.createProfile(newProfile);

    bot.owners = ['303235142283952128','630456490540400703','693676638373937182']; //' Setting bot owners id '//
    bot.mainServer = bot.guilds.cache.get('538548215914561537'); //' Development server '//
    bot.mainLogChannel = bot.mainServer.channels.cache.get('686761678247165955'); //' Channel for bot-related logs '//

    if (message.content.indexOf(settings.prefix) !== 0) return; //' If message don't starts with the prefix, return nothing '//
    let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    let member =
    message.mentions.members.first() ||
    message.guild.members.cache.find(u => u.id == args[0]) ||
    message.guild.members.cache.find(u => u.user.tag == args[0]) ||
    message.guild.members.cache.find(u => args[0].includes(u.username)) ||
    message.member;

    let commandName = args.shift().toLowerCase();
    let cmd;
    if (bot.commands.has(commandName)) {
        cmd = bot.commands.get(commandName);
    } else if (bot.aliases.has(commandName)) {
        cmd = bot.commands.get(bot.aliases.get(commandName));
    } else {
        return;
    }

    if (cmd.command.disabled == true && bot.owners.includes(message.author)) return message.channel.send('Opa, foi mal! Esse comando foi desativado pelo desenvolvedor!'); //' If 'exports.command.disabled' is set to true on any command, don't execute the command and return nothing '//
    if (userProfile ? userProfile.isBlacklisted : true) return; //' If message author is blacklisted, return nothing '//

    try {
        cmd.run(bot, message, args, settings, member); //' Executes the command '//
        bot.increaseCommandCount();
		bot.updateLog('Comando usado -> ' + commandName + ', usado por ' + message.member.nickname);
    } catch (e) {
        message.channel.send('Um eggrro ocorreu:\n' + '```js' + e + '```');
        return;
    }

    if (message.content.startsWith(`<@!${bot.user.id}>`)) message.channel.send(`Querendo ajuda? meu prefixo nesse servidor é \`${prefix}\`.\nCaso queira ver uma lista de comandos, digite \`${prefix}comandos\` ou \`${prefix}cmds\`.`); //' Make the bot reply with useful info if message starts with bot mention '//

    const messageCheck = Math.floor(Math.random() * 10) + 1;
    const amount = Math.floor(Math.random() * 4) + 1;

    if (messageCheck >= 2 && messageCheck <= 8) {
        try {
            await bot.updateCoins(bot, message.member, amount);
        } catch (e) {
            console.error(`PERFIL > USUÁRIO | Ocorreu um erro ao tentar atualizar os valores de "${message.author.id}".\n`.error + `${e}`.warn);
        }
    } //' If messageCheck is equals or greater than 2 and equals or less than 3, call function #updateCoins '//

    module.exports.objects = {
        member: member
    };
};