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
    bot.config = require('../config');
    bot.getGuild = async guild => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return bot.config.defaultSettings;
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
        let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, bot.config.defaultSettings);
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

        const newProfile = await new Profile(merged);
        bot.updateLog(`Novo perfil de usuário criado para \`\`${merged.userID}\`\`, na guild \`\`${merged.guildID}\`\``);
        return newProfile.save().then(console.log(`PERFIL > USUÁRIO | Novo perfil salvo para "${merged.userID}", na guild "${merged.guildID}"`.updated));
    };

    bot.getProfile = async (user, extraData) => {
        const data = await Profile.findOne({ userID: user.id });
        if (extraData) {
            if (typeof(extraData) != 'boolean') return;
            Profile.findOne({ userID: user.id }).then(async result => {
                return result;
            });
        }
        if (data) return data;
        else return;
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
    //<-------//
    //: Logs ://
    //------->//
    bot.getLatestLog = async () => {
        let lastMessage;
        if (bot.mainLogChannel) {
            if (bot.mainLogChannel.lastMessage) {
                lastMessage = bot.mainLogChannel.lastMessage;
            } else {
                lastMessage = undefined;
            }
        }
        if (!bot.mainLogChannel.deleted) {
            if (!lastMessage || lastMessage == undefined) {
                console.error(`LOG | Falha ao obter um log. Não existem logs para obter.`.error);
                return messages.fail.messageDontExist;
            } else {
                return lastMessage;
            }
        } else {
            console.error(`LOG | Falha ao obter um log. O canal especificado não existe.`.error);
            return messages.fail.channelDontExist;
        }
    };

    bot.makeLog = async logString => {
        let lastMessage;
        if (bot.mainLogChannel) {
            if (bot.mainLogChannel.lastMessage) {
                lastMessage = bot.mainLogChannel.lastMessage;
            } else {
                lastMessage = undefined;
            }
        }
        if (!logString || logString.length < 1) {
            console.error(`LOG | Falha ao postar um novo log. Mensagem para postar estava vazia.`.error);
            return messages.fail.logStringEmpty;
        }
        if (!bot.mainLogChannel.deleted) {
            bot.mainLogChannel.send(logString + ` [${moment(Date.now()).format('LT')}]`);
            await console.log(`LOG | Uma nova log foi postada com sucesso! ID: ${lastMessage.id}`.warn);
            return messages.success.logSended;
        } else {
            console.error(`LOG | Falha ao postar um novo log. O canal especificado não existe.`.error);
            return messages.fail.channelDontExist;
        }
    };

    bot.updateLog = async (logString,updateReason,logIDOptional) => {
        let lastMessage;
        if (bot.mainLogChannel) {
            if (bot.mainLogChannel.lastMessage) {
                lastMessage = bot.mainLogChannel.lastMessage;
            } else {
                lastMessage = undefined;
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
        if (!updateReason) { updateReason = 'Motivo não especificado'; }
        if (!logIDOptional || typeof(logIDOptional) !== 'string') {
            if (!lastMessage) {
                console.error(`LOG | Falha ao editar um log. Não existem logs para editar.`.error);
                return messages.fail.messageDontExist;
            } else {
                console.log(`LOG | Log editado com sucesso! ID: ${lastMessage.id}`.warn);
                if (lastMessage.length > 1000) {
                    console.warn(`LOG | Log ${lastMessage.id} ultrapassou 1000 caractéres, postando um novo log...`);
                    bot.makeLog(logString);
                    return messages.success.logSended;
                }
                lastMessage.edit(lastMessage.content + '\n' + logString + ` [${moment(Date.now()).format('LT')}]`,updateReason);
                return messages.success.logEdited;
            }
        } else {
            if (!bot.mainLogChannel.messages.cache.get(logIDOptional)) {
                console.error(`LOG | Falha ao editar um log. A mensagem especificada não existe. ID providenciado: ${logIDOptional}`.error);
                return messages.fail.messageDontExist;
            } else {
                console.log(`LOG | Log editado com sucesso! ID: ${logIDOptional}`.warn);
                bot.mainLogChannel.messages.cache.get(logIDOptional).edit(bot.mainLogChannel.messages.cache.get(logIDOptional).content + '\n' + logString + ` [${moment(Date.now()).format('LT')}]`,updateReason);
                return messages.success.logEdited;
            }
        }
    };

    bot.deleteLog = async logIDOptional => {
        let lastMessage;
        if (bot.mainLogChannel) {
            if (bot.mainLogChannel.lastMessage) {
                lastMessage = bot.mainLogChannel.lastMessage;
            } else {
                lastMessage = undefined;
            }
        }
        if (!logIDOptional || typeof(logIDOptional) !== 'string') {
            if (!lastMessage) {
                console.error(`LOG | Falha ao deletar um log. Não existem logs para deletar.`.error);
                return messages.fail.messageDontExist;
            } else {
                console.log(`LOG | Log deletado com sucesso! ID: ${lastMessage.id}`.warn);
                lastMessage.delete();
                return messages.success.logDeleted;
            }
        } else {
            if (!bot.mainLogChannel.messages.cache.get(logIDOptional)) {
                console.error(`LOG | Falha ao deletar um log. A mensagem especificada não existe. ID providenciado: ${logIDOptional}`.error);
                return messages.fail.messageDontExist;
            } else {
                console.log(`LOG | Log deletado com sucesso! ID: ${logIDOptional}`.warn);
                bot.mainLogChannel.messages.cache.get(logIDOptional).delete();
                return messages.success.logDeleted;
            }
        }
    };
    //<-------//
    //: Util ://
    //------->//
    bot.guildAvailable = async guild => {
        if (!guild || typeof(guild != 'string')) {
            console.error(`ERRO | Falha ao obter a disponibilidade de uma guild. Guild fornecida não existe ou não pode ser encontrada.`.error);
            return messages.fail.guildDontExist;
        }
        const available = guild.available;
        if (!available) return false;
        else return true;
    };

    bot.isOwner = async user => {
        let userID = user.id;
        switch (bot.owners.includes(userID)) {
            case true:
            return true;
            case false:
            return false;
        }
    };

    bot.updateCoins = async (bot, member, amount) => {
        const profile = await bot.getProfile(member); ////////////////////////' #botFunctions :getProfile '/////
        const newAmount = profile ? profile.coins + amount : amount; /////////' User coins value '//////////////
        await bot.updateProfile(member, { coins: newAmount, experience: newAmount + 2, experienceTotal: newAmount + 2 }); ///////////////' #botFunctions :updateProfile '//
    };

    // Tentar fazer uma função para loja, compras de coisas, passar de nível, e etc amanhã.
    // Pensar melhor amanhã.

    bot.getBotProfile = () => {
        Bot.findOne({ _id: '5e969f521e939a11ac13871b' }).then(async Result => {
            if (!Result || Result == null || Result == undefined) return console.error(`PERFIL > BOT | Falha ao obter o perfil do bot. Nenhum resultado foi encontrado.`.error);
            return Result;
        });
    };

    bot.newChangelog = async changelogString => {
        if (!changelogString || typeof(changelogString) !== 'string' || changelogString.length < 1) {
            console.error(`PERFIL > BOT | Falha ao adicionar um changelog à DB. Texto fornecido estava incorreto.`.error);
            return messages.fail.textIncorrect;
        }

        const profile = bot.getBotProfile();
        await profile.changelogs.push(moment(Date.now()).format('ll') + ' às ' + moment(Date.now()).format('LT') + `\n${changelogString}`);
        console.log(`PERFIL > BOT | Sucesso ao adicionar um changelog à DB!`.ready);
        bot.updateLog(`Novo changelog adicionado à DB: ${changelogString}`);
    };

    // bot.getChangelog = async numberOptional => {
    //     const profile = bot.getBotProfile();
    //     const changelogs = profile.changelogs;

    //     if (changelogs.length < 1) {
    //         console.log(`PERFIL > BOT | Falha ao obter os changelogs. Tenha certeza que a array não está vazio.`.error);
    //         return messages.fail.arrayEmpty;
    //     }

    //     switch (numberOptional) {
    //         case typeof(numStringOptional) == 'number':
    //             if (!changelogs[numberOptional - 1]) {
    //                 console.log(`PERFIL > BOT | Falha ao obter os changelogs. Tenha certeza que forneceu um valor no alcance.`);
    //                 return messages.fail.arrayOutOfRange;
    //             } else {
    //                 console.log(`PERFIL > BOT | Sucesso ao obter um changelog!`);
    //                 return changelogs[numberOptional - 1];
    //             }
    //         default:
    //             if (!changelogs[changelogs.length - 1]) {
    //                 console.log(`PERFIL > BOT | Falha ao obter os changelogs. Tenha certeza que existem valores definidos.`);
    //                 return messages.fail.arrayEmpty;
    //             } else {
    //                 console.log(`PERFIL > BOT | Sucesso ao obter um changelog!`);
    //                 return changelogs[changelogs.length - 1];
    //             }
    //     }
    // };

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
        console.log(`BOT > ATIVIDADE | Atividade do bot atualizada! Nova atividade: ${text}`.loaded);
        bot.updateLog(`Atividade do bot alterada. Nova atividade: ${text}`);
        return messages.success.activityUpdated;
    };

    bot.refreshFunctions = () => {
        delete require.cache[require.resolve(`./botFunctions.js`)];
        return messages.success.functionsRestarted;
    };

    bot.clean = text => {
        if (typeof(text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };
};