const chalk = require('chalk');
const moment = require('moment');
moment.locale('pt-br');
const mongoose = require('mongoose');
const { Guild, MemberProfile, UserProfile, Bot } = require('../models');
const messages = {
    fail: {
        guildNotAvailable: 'Fail | Guild is not available',
        messageDontExist: 'Fail | Message do not exist',
        textIncorrect: 'Fail | Text is incorrrect',
        channelDontExist: 'Fail | Channel do not exist',
        userDontExist: 'Fail | User do not exist',
        guildDontExist: 'Fail | Guild do not exist',
        logStringEmpty: 'Fail | Log string was empty',
        characterLimit: 'Fail | Text exceeded character limit.',
        arrayEmpty: 'Fail | Array was empty',
        arrayOutOfRange: 'Fail | Invalid array position'
    },
    success: {
        logSended: 'Success | Log sended without problems',
        logEdited: 'Success | Log edited without problems',
        logDeleted: 'Success | Log deleted without problems',
        functionsRestarted: 'Success | Main functions restarted without problems',
        activityUpdated: 'Success | Bot activity updated without problems',
        changelogAdded: 'Success | Changelog added without problems'
    }
};

module.exports = bot => {
    //<----------------//
    //: Guild Profile ://
    //---------------->//
    bot.getGuild = async guild => {
        let data = await Guild.findOne({ _id: guild.id });
        if (data) return data;
        else {
            await bot.createGuild({ _id: guild.id }).then(data => {
                return data;
            });
        }
    };

    bot.updateGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(chalk.green(`PERFIL > GUILD | Servidor "${data._id}" atualizou as configurações: ${Object.keys(settings)}`));
        return await data.updateOne(settings);
    };

    bot.createGuild = async settings => {
        let defaults = Object.assign(bot.defaults.mainGuildSettings);
        let merged = Object.assign(defaults, settings);

        try {
            const newGuild = await new Guild(merged);
            bot.updateLog(`PERFIL > GUILD | Novo perfil de guild criado para \`\`${merged._id}\`\`.`);
            return newGuild.save().then(console.log(chalk.green(`PERFIL > GUILD | Configurações padrões salvas para "${merged._id}"`)));
        } catch (e) {
            return console.error(chalk.red(`PERFIL > GUILD | Não foi possivel criar um perfil de guild.\n`) + chalk.cyan(`${e}`));
        }
    };
    //<-----------------------//
    //: Guild Member Profile ://
    //----------------------->//
    bot.getMemberProfile = async member => {
        const data = await MemberProfile.findOne({ userID: member.id, guildID: member.guild.id });
        if (data) return data;
        else {
            await bot.createMemberProfile({ userID: member.id, guildID: member.guild.id}).then(async function() {
                return await MemberProfile.findOne({ userID: member.id, guildID: member.guild.id });
            });
        }
    };

    bot.createMemberProfile = async profile => {
        if (profile.guildID == undefined) return;
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);
        try {
            const newProfile = await new MemberProfile(merged);
            return newProfile.save().then(console.log(`PERFIL > MEMBRO | Novo perfil de membro salvo para "${merged.userID}", na guild "${merged.guildID}"`.updated));
        } catch (e) {
            return console.error(chalk.red(`PERFIL > MEMBRO | Não foi possivel criar um perfil de membro.\n`) + chalk.cyan(`${e}`));
        }
    };

    bot.updateMemberProfile = async (member, newData) => {
        let profile = await bot.getMemberProfile(member);

        if (typeof profile !== 'object') profile = {};
        for (const key in newData) {
            if (profile[key] !== newData[key]) profile[key] = newData[key];
            else continue;
        }

        return await profile.updateOne(profile);
    };
    //<-------------------//
    //: Bot User Profile ://
    //------------------->//
    bot.getUserProfile = async member => {
        const data = await UserProfile.findById(member.id);

        if (data) return data;
        else {
            try {
                await bot.createUserProfile({ _id: member.id }).then(async function() {
                    return await UserProfile.findOne({
                        _id: member.id
                    });
                });
            } catch (e) {
                return;
            }

        }
    };

    bot.createUserProfile = async profile => {
        try {
            const newProfile = await new UserProfile(profile);
            newProfile.save().then(async function() {
                console.log(chalk.green(`PERFIL > USUÁRIO | Novo perfil de usuário criado para "${profile._id}"`));
                return await UserProfile.findById(profile._id);
            });
        } catch (e) {
            return console.error(chalk.red(`PERFIL > USUÁRIO | Não foi possivel criar um perfil de usuário.\n`) + chalk.cyan(`${e}`));
        }
    };

    bot.updateUserProfile = async (member, newData) => {
        let profile = await bot.getUserProfile(member);

        if (typeof profile !== 'object') profile = {};
        for (const key in newData) {
            if (profile[key] !== newData[key]) profile[key] = newData[key];
            else continue;
        }

        return await profile.updateOne(profile);
    };

    bot.updateCoins = async (member, amount, noExtra) => {
        const profile = await bot.getUserProfile(member);

        const newAmount = profile ? profile.economy.coins + (amount) : amount;
        let extra;

        let chance = Math.random(1, 10);
        if (chance <= 4) extra = 0;
        else if (chance >= 5) extra = Math.random(1, 4);
        if (noExtra == true) extra = 0;

        return await bot.updateUserProfile(member, { economy: { coins: newAmount + extra } });
    };

    let expCooldown = false;
    const cooldownTime = 60;
    bot.updateExperience = async (member, amount) => {
        if (expCooldown == false) {
            expCooldown = true;
            const profile = await bot.getUserProfile(member);
            const newAmount = profile ? profile.profile.experience + amount : amount;

            await bot.updateUserProfile(member, {
                profile: {
                    level: profile.profile.level,
                    experience: newAmount,
                    experienceTotal: newAmount,
                    toNextLevel: profile.profile.toNextLevel

                }
            });

            if (profile.profile.experience >= profile.profile.toNextLevel) {
                await bot.updateUserProfile(member, {
                    profile: {
                        level: profile.profile.level++,
                        experience: profile.profile.experience - profile.profile.toNextLevel,
                        toNextLevel: Math.floor((profile.profile.toNextLevel + 35 + ((profile.profile.level * 4) + 100)))
                    }
                });
                return console.log(chalk.cyan(`LEVEL | Usuário ${profile.userID} passou para o nível ${profile.profile.level}! A próxima meta é ${profile.profile.toNextLevel}.`));
            }
            return true;
        } else {
            setTimeout(function() {
                expCooldown = false;
            }, cooldownTime * 1e3);
            return expCooldown;
        }
    };
    //<-------//
    //: Logs ://
    //------->//
    let lastMessage;
    bot.makeLog = logString => {
        const disabled = true;
        if (disabled == true) return; //temporary
        if (!logString || logString.length < 1) {
            console.error(chalk.red(`LOG | Falha ao postar um novo log. Mensagem para postar estava vazia.`));
            return messages.fail.logStringEmpty;
        }
        if (!bot.mainLogChannel.deleted) {
            try {
                bot.mainLogChannel.send(logString + ` [${moment(Date.now()).format('LT')}]`);
                return messages.success.logSended;
            } catch (e) {
                console.error(chalk.red(`LOG | Falha ao postar um novo log.`) + chalk.cyan(`\n${e}`));
                return false;
            }
        } else {
            console.error(chalk.red(`LOG | Falha ao postar um novo log. O canal especificado não existe.`));
            return messages.fail.channelDontExist;
        }
    };

    bot.updateLog = (logString, supressDateStamp) => {
        const disabled = true;
        if (disabled == true) return; //temporary
        if (bot.mainLogChannel) {
            if (bot.mainLogChannel.lastMessage) {
                lastMessage = bot.mainLogChannel.lastMessage;
            }
        }

        if (!logString || logString.length < 1) {
            console.error(chalk.red(`LOG | Falha ao editar um log. Mensagem para postar estava vazia.`));
            return messages.fail.logStringEmpty;
        }

        if (logString.length > 1000) {
            console.error(chalk.red(`LOG | Falha ao editar um log. Mensagem para postar ultrapassou o limite de caractéres.`));
            return messages.fail.characterLimit;
        }

        if (!lastMessage) {
            bot.makeLog(logString);
            return messages.success.logSended;
        } else {
            if (lastMessage.length > 1000) {
                console.warn(`LOG | Log ${lastMessage.id} ultrapassou 1000 caractéres, postando um novo log...`);
                bot.makeLog(logString);
                return messages.success.logSended;
            }
            if (supressDateStamp == true) {
                lastMessage.edit(lastMessage.content + '\n' + logString);
                return messages.success.logEdited;
            } else {
                lastMessage.edit(lastMessage.content + '\n' + logString, `[${moment(Date.now()).format('LT')}]`);
                return messages.success.logEdited;
            }
        }
    };
    //<-------//
    //: Util ://
    //------->//
    bot.getBotProfile = async () => {
        let data = await Bot.findById(bot.user.id);
        if (data) return data;
        else return undefined;
    };

    bot.memberIs = async (member, typeOfStatus) => {
        let userID = member.id;
        let profile = await bot.getBotProfile();

        switch (typeOfStatus.toLowerCase()) {
            case 'owner':
            if (profile.owners.includes(userID)) return true;
            else return false;
            case 'developer':
            if (profile.owners.includes(userID)) return true;
            if (profile.devs.includes(userID)) return true;
            else return false;
            default:
            return false;
        }
    };

    bot.newChangelog = async changelogString => {
        if (!changelogString || typeof(changelogString) !== 'string' || changelogString.length < 1) {
            console.error(chalk.red(`PERFIL > BOT | Falha ao adicionar um changelog à DB. Texto fornecido estava incorreto.`));
            return messages.fail.textIncorrect;
        }

        const profile = await bot.getBotProfile();
        await profile.changelogs.push(moment(Date.now()).format('ll') + ' às ' + moment(Date.now()).format('LT') + `\n${changelogString}`);
        return messages.success.changelogAdded;
    };

    bot.getChangelog = async numberOptional => {
        const profile = await bot.getBotProfile();
        const changelogs = profile.changelogs;

        if (changelogs.length < 1) {
            console.error(chalk.red(`PERFIL > BOT | Falha ao obter os changelogs. Tenha certeza que a array não está vazio.`));
            return messages.fail.arrayEmpty;
        }

        switch (numberOptional) {
            case typeof(numStringOptional) == 'number':
            if (!changelogs[numberOptional]) {
                console.error(chalk.red(`PERFIL > BOT | Falha ao obter os changelogs. Valor fornecido fora de alcance.`));
                return messages.fail.arrayOutOfRange;
            } else {
                return changelogs[numberOptional];
            }
            default:
            if (!changelogs[changelogs.length]) {
                console.error(chalk.red(`PERFIL > BOT | Falha ao obter os changelogs. Tenha certeza que existe algo na array.`));
                return messages.fail.arrayEmpty;
            } else {
                return changelogs[changelogs.length];
            }
        }
    };

    bot.increaseCommandCount = async () => {
        let profile = await bot.getBotProfile();
        return await profile.updateOne({ commandUsageCount: profile.commandUsageCount + 1 });
    };

    bot.updateActivity = (text,activityTypeOptional) => {
        if (!text || typeof(text) !== 'string' || text.length < 1) {
            console.error(chalk.red(`BOT > ATIVIDADE | Falha ao atualizar a atividade do bot. Texto fornecido estava incorreto.`));
            return messages.fail.textIncorrect;
        }

        switch (activityTypeOptional) {
            case 1:
            bot.user.setActivity(text, { type: 'PLAYING' });
            break;
            case 2:
            bot.user.setActivity(text, { type: 'STREAMING' });
            break;
            case 3:
            bot.user.setActivity(text, { type: 'LISTENING' });
            break;
            case 4:
            bot.user.setActivity(text, { type: 'WATCHING' });
            break;
            default:
            bot.user.setActivity(text);
            break;
        }
        bot.updateLog(`Atividade do bot alterada. Nova atividade: ${text}`);
        return messages.success.activityUpdated;
    };

    bot.getSharedServers = member => {
        let serverCount = 0;
        let guilds = [];
        try {
            bot.guilds.cache.forEach(guild => {
                if (guild.members.cache.get(member.id)) {
                    serverCount++;
                    guilds.push(guild);
                }
            });
            if (serverCount < 1) return 'Esse usuário não tem nenhum servidor em comum.';
            return guilds;
        } catch (e) {
            console.error(chalk.red(`USUÁRIO | Ocorreu um erro ao tentar obter os servidores em comum com "${member.id}".`) + chalk.cyan(`\n${e}`));
            return messages.fail.userDontExist;
        }
    };

    bot.cleanText = text => {
        if (typeof(text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };
};