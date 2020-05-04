module.exports = async (bot, message) => {
    if (message.author.bot) return; /////////////' If message author is a bot, return nothing '//
    if (message.channel.type === 'dm') return; //' If message channel is a Direct Message channel, return nothing '//

	let settings;
    try {
        settings = await bot.getGuild(message.guild);
    } catch (error) {
        console.error(error);
    } //' Main bot settings for guild (prefix, log channel etc) '//

    const prefix = settings.prefix;

    const newProfile = {
        guildID: message.member.guild.id,
        userID: message.author.id,
        username: message.author.tag,
        isBlacklisted: false,
        isDeveloper: false,
        isOwner: false
    };

    const userProfile = await bot.getProfile(message.author); //' var = require('../models/profile') '//
    if (!userProfile) return await bot.createProfile(newProfile);

    bot.owners = ['303235142283952128','630456490540400703','693676638373937182']; //' Setting bot owners '//
    bot.mainServer = bot.guilds.get('538548215914561537'); //' Development server '//
    bot.mainLogChannel = bot.mainServer.channels.get('686761678247165955'); //' Channel for bot-related logs '//

    if (message.content.startsWith(`<@!${bot.user.id}>`)) return message.channel.send(`Querendo ajuda? meu prefixo nesse servidor é \`${prefix}\`.\nCaso queira ver uma lista de comandos, digite \`${prefix}comandos\` ou \`${prefix}cmds\`.`); //' Make the bot reply with useful info if message starts with bot mention '//

    const messageCheck = Math.floor(Math.random() * 10) + 1;
    const amount = Math.floor(Math.random() * 4) + 1;

    if (messageCheck >= 2 && messageCheck <= 5) {
        try {
            await bot.updateCoins(bot, message.member, amount);
        } catch (e) {
            console.error(`PERFIL > USUÁRIO | Ocorreu um erro ao tentar atualizar os valores de "${message.author.id}".\n`.error + `${e}`.warn);
        }
    } //' If messageCheck is equals or greater than 2 and equals or less than 5, call function #updateCoins '//

    if (message.content.indexOf(settings.prefix) !== 0) return; //' If message don't starts with the prefix, return nothing '//
    let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    //' const user = (message.mentions ? message.mentions.members.first : true) || (message.guild ? message.guild.members.get(args[0]) : true); '//
    let cmd;
    if (bot.commands.has(command)) {
        cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
        cmd = bot.commands.get(bot.aliases.get(command));
    }
    if (cmd ? cmd.help.disabled : true && !bot.isOwner(message.author)) return message.channel.send('Opa, foi mal! Esse comando foi desativado pelo desenvolvedor!'); //' If 'exports.help.disabled' is set to true on any command, don't execute the command and return nothing '//
    if (userProfile ? userProfile.isBlacklisted : true) return; //' If message author is blacklisted, return nothing '//
    try {
        cmd.run(bot, message, args, settings); //' Executes the command '//
    } catch (e) {
        return;
    }
    //' Function for updating coins/experience '//
    // async function updateCoins(bot, member, amount) {
    //     const profile = await bot.getProfile(member); ////////////////////////' #botFunctions :getProfile '/////
    //     const newAmount = profile ? profile.coins + amount : amount; /////////' User coins value '//////////////
    //     const newAmountXP = profile ? profile.experience + amount : amount; //' User experience value '/////////
    //     await bot.updateProfile(member, { coins: newAmount }); ///////////////' #botFunctions :updateProfile '//
    //     await bot.updateProfile(member, { experience: newAmountXP + 2 }); ////' ---------------------------- '//
    // }
};
