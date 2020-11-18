const moment = require('moment');
moment.locale('pt-br');
const mongoose = require('mongoose');
const { Guild, Profile, Bot } = require('../models');
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
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return bot.defaults.mainGuildSettings;
    };

    bot.updateGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`PERFIL > GUILD | Servidor "${data.guildID}" atualizou as configurações: ${Object.keys(settings)}`.updated);
        return await data.updateOne(settings);
    };

    bot.createGuild = async settings => {
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, bot.defaults.mainGuildSettings);
        let merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        await bot.updateLog(`Novo perfil de guild criado para \`\`${merged.guildID}\`\`.`);
        return newGuild.save().then(console.log(`PERFIL > GUILD | Configurações padrões salvas para "${merged.guildID}"`.updated));
    };

    bot.deleteGuild = async guild => {
        if (!guild || !bot.getGuild(guild)) return console.error(`GUILD | Falha ao deletar uma guild da DB. A guild não existe ou ID fornecido estava incorreto.`.error);
        if (typeof(guild) === 'string')  {
            await Guild.deleteOne({ guildID: guild });
            await bot.updateLog(`Uma guild foi excluida da DB. ID: ${guild}`);
            return console.log(`PERFIL > GUILD | Guild ${guild} excluida da DB com sucesso!`.updated);
        } else {
            await Guild.deleteOne({ guildID: guild.id });
            await bot.updateLog(`Uma guild foi excluida da DB. ID: ${guild.id}`);
            return console.log(`PERFIL > GUILD | Guild ${guild.id} excluida da DB com sucesso!`.updated);
        }
    };
    //<---------------//
    //: User Profile ://
    //--------------->//
    bot.createProfile = async profile => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);

        try {
            const newProfile = await new Profile(merged);
            return newProfile.save().then(console.log(`PERFIL > USUÁRIO | Novo perfil salvo para "${merged.userID}", na guild "${merged.guildID}"`.updated));
        } catch (e) {
            return console.error(`PERFIL > USUÁRIO | Não foi possivel criar um perfil de usuário.\n`.err + `${e}`.warn);
        }
    };

    bot.getProfile = async (user, extraData) => {
        const data = await Profile.findOne({ userID: user.id });
        if (extraData) {
            if (typeof(extraData) != 'boolean') return;
            Profile.findOne({ userID: user.id }).then(async result => {
                return console.log(result);
            });
        }
        if (data) return data;
        else {
            bot.createProfile({ userID: user.id, userWarnings: { warningsTotal: 0, warningsDetail: [], }, isBlacklisted: false });
        }
    };

    bot.updateProfile = async (user, data) => {
        let profile = await bot.getProfile(user);

        if (typeof profile !== 'object') profile = {};
        for (const key in data) {
            if (profile[key] !== data[key]) profile[key] = data[key];
            else return;
        }

        return await profile.updateOne(profile);
    };

    bot.deleteProfile = async user => {
        if (!user || !bot.getProfile(user)) return console.error(`PERFIL | Falha ao deletar um perfil da DB. Perfil não existe ou ID fornecido estava incorreto.`.error);

        if (typeof(user) === 'string')  {
            await Profile.deleteOne({ userID: user });
            await bot.updateLog(`Um perfil de usuário foi excluido da DB. ID: ${user}`);
            return console.log(`PERFIL > USUÁRIO | Perfil ${user} excluido da DB com sucesso!`.updated);
        } else {
            await Profile.deleteOne({ guildID: user.id });
            await bot.updateLog(`Um perfil de usuário foi excluido da DB. ID: ${user.id}`);
            return console.log(`PERFIL > USUÁRIO | Perfil ${user.id} excluido da DB com sucesso!`.updated);
        }
    };

    bot.updateCoins = async (bot, member, amount) => {
        const profile = await bot.getProfile(member);
        const newAmount = profile ? profile.coins + amount : amount;
        await bot.updateProfile(member, { coins: newAmount, experience: newAmount + 2, experienceTotal: newAmount + 2 }); ///////////////' #botFunctions :updateProfile '//
        if (profile.experience >= profile.toNextLevel) {
            await bot.updateProfile(member, { level: profile.level += 1, experience: profile.experience - profile.toNextLevel, toNextLevel: Math.floor((profile.toNextLevel + 35)) });
            console.log(`LEVEL | Membro ${profile.userID} passou para o nível ${profile.level}! A próxima meta é ${profile.toNextLevel}.`.warn);
        }
    };
    //<-------//
    //: Logs ://
    //------->//
    let lastMessage;
    bot.makeLog = async logString => {
        const disabled = true;
        if (disabled == true) return; //temporary
        if (!logString || logString.length < 1) {
            console.error(`LOG | Falha ao postar um novo log. Mensagem para postar estava vazia.`.error);
            return messages.fail.logStringEmpty;
        }
        if (!bot.mainLogChannel.deleted) {
            bot.mainLogChannel.send(logString + ` [${moment(Date.now()).format('LT')}]`);
            console.log(`LOG | Uma nova log foi postada com sucesso! ID: ${lastMessage.id}`.warn);
            return messages.success.logSended;
        } else {
            console.error(`LOG | Falha ao postar um novo log. O canal especificado não existe.`.error);
            return messages.fail.channelDontExist;
        }
    };

    bot.updateLog = async (logString, supressDateStamp) => {
        const disabled = true;
        if (disabled == true) return; //temporary
        if (bot.mainLogChannel) {
            if (bot.mainLogChannel.lastMessage) {
                lastMessage = bot.mainLogChannel.lastMessage;
            }
        }

        if (!logString || logString.length < 1) {
            console.error(`LOG | Falha ao editar um log. Mensagem para postar estava vazia.`.error);
            return messages.fail.logStringEmpty;
        }

        if (logString.length > 1000) {
            console.error(`LOG | Falha ao editar um log. Mensagem para postar ultrapassou o limite de caractéres.`.error);
            return messages.fail.characterLimit;
        }

        if (!lastMessage) {
            console.error(`LOG | Falha ao editar um log. Não existem logs para editar.`.error);
            return messages.fail.messageDontExist;
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
    bot.guildAvailable = guild => {
        if (!guild || guild == undefined) {
            console.error(`GUILD | Falha ao obter a disponibilidade de uma guild. Guild fornecida não existe ou não pode ser encontrada.`.error);
            return messages.fail.guildDontExist;
        }
        const available = guild.available;
        if (!available) return false;
        else return true;
    };

    bot.memberIs = async (member, typeOfStatus) => {
        typeOfStatus = typeOfStatus.toLowerCase();
        let userID = member.user.id;
        let profile = await bot.getBotProfile();

        switch (typeOfStatus) {
            case 'owner':
                if (profile.owners.includes(userID)) return true;
                else return false;
            case 'developer':
                if (profile.owners.includes(userID)) return true;
                if (profile.devs.includes(userID)) return true;
                else return false;
        }
    };

    bot.getBotProfile = async () => {
        let data = await Bot.findOne({ _id: mongoose.Types.ObjectId('5f08b4497586a91384c1e434') });
        if (data) return data;
        else {
            try {
                const newProfile = await new Bot({
                    _id: mongoose.Types.ObjectId(),
                    commandUsageCount: 0,
                    changelogs: [],
                    owners: ['303235142283952128', '630456490540400703'],
                    devs: [],
                });
                await newProfile.save().then(result => { return result; });
            } catch (e) {
                console.error(`PERFIL > BOT | Falha ao tentar criar o perfil do bot.`.error + `\n${e}`.warn);
            }
        }
    };

    bot.newChangelog = async changelogString => {
        if (!changelogString || typeof(changelogString) !== 'string' || changelogString.length < 1) {
            console.error(`PERFIL > BOT | Falha ao adicionar um changelog à DB. Texto fornecido estava incorreto.`.error);
            return messages.fail.textIncorrect;
        }

        const profile = await bot.getBotProfile();
        await profile.changelogs.push(moment(Date.now()).format('ll') + ' às ' + moment(Date.now()).format('LT') + `\n${changelogString}`);
        console.log(`PERFIL > BOT | Sucesso ao adicionar um changelog à DB!`.ready);
        return true;
    };

    bot.getChangelog = async numberOptional => {
        const profile = await bot.getBotProfile();
        const changelogs = profile.changelogs;

        if (changelogs.length < 1) {
            console.log(`PERFIL > BOT | Falha ao obter os changelogs. Tenha certeza que a array não está vazio.`.error);
            return messages.fail.arrayEmpty;
        }

        switch (numberOptional) {
            case typeof(numStringOptional) == 'number':
                if (!changelogs[numberOptional]) {
                    console.log(`PERFIL > BOT | Falha ao obter os changelogs. Tenha certeza que forneceu um valor no alcance.`);
                    return messages.fail.arrayOutOfRange;
                } else {
                    console.log(`PERFIL > BOT | Sucesso ao obter um changelog!`);
                    return changelogs[numberOptional];
                }
            default:
                if (!changelogs[changelogs.length]) {
                    console.log(`PERFIL > BOT | Falha ao obter os changelogs. Tenha certeza que existem valores definidos.`);
                    return messages.fail.arrayEmpty;
                } else {
                    console.log(`PERFIL > BOT | Sucesso ao obter um changelog!`);
                    return changelogs[changelogs.length];
                }
        }
    };

    bot.increaseCommandCount = async () => {
        let profile = await bot.getBotProfile();
        return await profile.updateOne({ commandUsageCount: profile.commandUsageCount + 1 });
    };

    bot.updateActivity = async (text,activityTypeOptional) => {
        if (!text || typeof(text) !== 'string' || text.length < 1) {
            console.error(`BOT > ATIVIDADE | Falha ao atualizar a atividade do bot. Texto fornecido estava incorreto.`.error);
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
            if (serverCount <= 1) return 'Esse usuário não tem nenhum servidor em comum.';
            return guilds;
        } catch (e) {
            console.error(`USUÁRIO | Ocorreu um erro ao tentar obter os servidores em comum com "${member.id}".`.error + `\n${e}`.warn);
            return messages.fail.userDontExist;
        }
    };

    bot.clean = text => {
        if (typeof(text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };
};