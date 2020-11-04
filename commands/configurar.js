const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar servidor.');

    const setting = args[0];
    const newSetting = args.slice(1).join(' ');

    const helpEmbed = new Discord.MessageEmbed();
    const subHelpEmbed = new Discord.MessageEmbed();
    helpEmbed.setColor('INVISIBLE');

    switch (setting) {
        case 'prefixo': {
            if (newSetting) {
                try {
                    await bot.updateGuild(message.guild, { prefix: newSetting });
                    return message.channel.send(`Novo prefixo definido: \`${newSetting}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Um erro ocorreu. Reporte para o desenvolvedor: **${error.message}**`);
                }
            }

            message.channel.send(`Prefixo atual: \`${settings.prefix}\``);
            break;
        }
        case 'logs': {
            if (newSetting) {
                try {
                    let channel = message.mentions.channels.first();
                    if (!channel) return message.channel.send('Esse canal não existe :/');
                    await bot.updateGuild(message.guild, { logsChannel: channel.id });
                    return message.channel.send(`Canal de logs definido para: \`${channel.name}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Um erro ocorreu. Reporte para o desenvolvedor: **${error.message}**`);
                }
            }

            message.channel.send(`Canal de logs: \`${settings.logsChannel}\``);
            break;
        }
        case 'reports': {
            if (newSetting) {
                try {
                    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
                    if (!channel) return message.channel.send('Esse canal não existe :/');
                    await bot.updateGuild(message.guild, { reportChannel: channel.id });
                    return message.channel.send(`Canal de denúncias definido para: \`${channel.name}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Um erro ocorreu. Reporte para o desenvolvedor: **${error.message}**`);
                }
            }

            message.channel.send(`Canal de reports: \`${settings.reportChannel}\``);
            break;
        }
        case 'mod-role': {
            if (newSetting) {
                try {
                    let role = newSetting;
                    let newRole = message.guild.roles.cache.find(r => r.name === role) || message.guild.roles.cache.find(r => r.id === role);
                    if (!newRole) return message.channel.send('Não foi possivel encontrar o cargo!');
                    await bot.updateGuild(message.guild, {modRole: newRole.name});
                    return message.channel.send(`Cargo de mod definido para: \`${newRole.name}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Um erro ocorreu. Reporte para o desenvolvedor: **${error.message}**`);
                }
            }

            message.channel.send(`Cargo de mod atual: \`${settings.modRole}\``);
            break;
        }
        case 'admin-role': {
            if (newSetting) {
                try {
                    let role = newSetting;
                    let newRole = message.guild.roles.cache.find(r => r.name === role) || message.guild.roles.cache.find(r => r.id === role);
                    if (!newRole) return message.channel.send('Não foi possivel encontrar o cargo!');
                    await bot.updateGuild(message.guild, {adminRole: newRole.name});
                    return message.channel.send(`Cargo de admin definido para: \`${newRole.name}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Um erro ocorreu. Reporte para o desenvolvedor: **${error.message}**`);
                }
            }

            message.channel.send(`Cargo de admin atual: \`${settings.adminRole}\``);
            break;
        }
        case 'muted-role': {
            if (newSetting) {
                try {
                    let role = newSetting;
                    let newRole = message.guild.roles.cache.find(r => r.name === role) || message.guild.roles.cache.find(r => r.id === role);
                    if (!newRole) return message.channel.send('Não foi possivel encontrar o cargo!');
                    await bot.updateGuild(message.guild, {mutedRole: newRole.name});
                    return message.channel.send(`Cargo de mutes definido para: \`${newRole.name}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`Um erro ocorreu. Reporte para o desenvolvedor: **${error.message}**`);
                }
            }

            message.channel.send(`Cargo de mutes atual: \`${settings.mutedRole}\``);
            break;
        }
        default: {
            const filter = (reaction, user) => ['❓', '❌'].includes(reaction.emoji.name) && user.id == message.author.id;

            subHelpEmbed.setAuthor(`${message.guild.name} | Configurações do bot`, message.guild.iconURL());
            subHelpEmbed.addField('Prefixo do bot', settings.prefix, true);
            subHelpEmbed.addField('Canal de logs', settings.logsChannel, true);
            subHelpEmbed.addField('Canal de reports', settings.reportChannel, true);
            subHelpEmbed.addField('Cargo de moderador', settings.modRole, true);
            subHelpEmbed.addField('Cargo de administrador', settings.adminRole, true);
            subHelpEmbed.addField('Cargo de mutes', settings.mutedRole, true);
            subHelpEmbed.setColor('GREEN');
            subHelpEmbed.setFooter('Dica: Reaja com o emoji \'?\' para mais informações. Reaja com o emoji \'X\' para redefinir todas as configurações para o padrão.');
            message.channel.send(subHelpEmbed).then(async msg => {

                await msg.react('❓');
                await msg.react('❌');

                msg.awaitReactions(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async collected => {
                    const reaction = collected.first();
                    switch (reaction.emoji.name) {
                        case '❓':
                            msg.reactions.removeAll();
                            helpEmbed.setDescription('**Ajuda | configurar**\n__Uso:__ configurar <configuração> [nova configuração]\n__Exemplo__: configurar logs #canal-para-logs\n__Configurações atuais__: `prefixo`, `logs`, `reports`, `mod-role`, `admin-role`, `muted-role`.\n*Prefixo* -> Define um novo prefixo para o bot no seu servidor.\n*Logs* -> Define o canal para logs de moderação.\n*Report* -> Define o canal para denúncias de usuários.\n*Mod role* -> Define o cargo de moderador para comandos do bot.\n*Admin role* -> Define o cargo de administrador para comandos do bot.\n*Mute role* -> Define o cargo usado para mutes.');
                            message.delete().then(() => message.channel.send(helpEmbed));
                            break;
                        case '❌':
                            msg.reactions.removeAll();
                            try {
                                await bot.updateGuild(message.guild, { prefix: '*' });
                                await bot.updateGuild(message.guild, { logsChannel: 'logs' });
                                await bot.updateGuild(message.guild, { reportChannel: 'reports' });
                                await bot.updateGuild(message.guild, { modRole: 'Moderador' });
                                await bot.updateGuild(message.guild, { adminRole: 'Administrador' });
                                await bot.updateGuild(message.guild, { mutedRole: 'Mutado' });
                            } catch (error) {
                                console.error(error);
                                message.channel.send(`Um erro ocorreu. Reporte para o desenvolvedor: **${error.message}**`);
                            }
                            msg.edit('Redefinido todas as configurações para o padrão!');
                            break;
                    }
                }).catch(async () => {
                    await msg.reactions.removeAll();
                    await msg.delete();
                });
            });

            break;
        }
    }
};

exports.help = {
    name: "configurar",
    aliases: ['config', 'ajustar'],
    categoria: "Servidor",
    descrição: 'Configura aspectos gerais do bot no seu servidor. Para mais informações, digite `configurar`',
    uso: "configurar <configuração> [nova configuração] | configurar muted-role Mute",
    permissões: "Gerenciar servidor",
    disabled: false
};

exports.command = {
    aliases: ['config'],
    description: "Configura aspectos gerais do bot no seu servidor. Para mais ajuda, digite \"configurar\".",
    usage: "configurar <chave de configuração> [novo valor] | configurar muted-role Mute",
    commandPermissions: ['MANAGE_GUILD'],
    commandCategory: {
        administration: true,
        information: false,
        economy: false,
        util: false,
        music: false,
        development: false
    },
    disabled: false
};