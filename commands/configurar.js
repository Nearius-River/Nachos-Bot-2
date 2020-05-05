const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.send('Uhh você precisa de permissão administrativa ou gerenciar servidor.');

    const setting = args[0];
    const newSetting = args.slice(1).join(' ');

    const helpEmbed = new Discord.MessageEmbed()
    .setColor('#36393F');

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
                    let channel = message.mentions.channels.first();
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
            const subfilter = (reaction, user) => ['◀'].includes(reaction.emoji.name) && user.id == message.author.id;

            message.channel.send('Reaja com o emoji \'?\' para mais informações. Reaja com o emoji \'X\' para redefinir todas as configurações para o padrão.').then(async msg => {

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
                            helpEmbed.setDescription(`**Ajuda | configurar**
__Uso:__ configurar <configuração> [nova configuração]
__Exemplo:__ configurar logs #canal-para-logs
__Configurações atuais:__ \`prefixo\`, \`logs\`, \`reports\`, \`mod-role\`, \`admin-role\`, \`muted-role\`.
*Prefixo* -> Define um novo prefixo para o bot no seu servidor.
*Logs* -> Define o canal pra logs do servidor aonde será postado os logs do bot.
*Reports* -> Define o canal para denúncias do servidor.
*Mod role* -> Define o cargo de moderador do bot para comandos moderativos.
*Admin role* -> Define o cargo de administrador do bot para comandos administrativos.
*Mute role* -> Define o cargo para mutes do bot.`);
                            msg.delete();
                            message.channel.send(helpEmbed);
                            break;
                        case '❌':
                            msg.reactions.removeAll();
                            try {
                                await bot.updateGuild(message.guild, { prefix: '*' });
                                await bot.updateGuild(message.guild, { logsChannel: 'logs' });
                                await bot.updateGuild(message.guild, { modRole: 'Moderador' });
                                await bot.updateGuild(message.guild, { adminRole: 'Administrador' });
                                await bot.updateGuild(message.guild, { mutedRole: 'Mutado' });
                                await bot.updateGuild(message.guild, { reportChannel: 'reports' });
                            } catch (error) {
                                console.error(error);
                                message.channel.send(`Um erro ocorreu. Reporte para o desenvolvedor: **${error.message}**`);
                            }
                            msg.edit('Redefinido todas as configurações para o padrão!');
                            break;
                    }
                }).catch(e => {
                    msg.reactions.removeAll();
                    msg.edit('Comando fechado.').then(m => m.delete(5000));
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
    descrição: `Configura aspectos gerais do bot no seu servidor. Para mais informações, digite \`configurar\``,
    uso: "configurar <configuração> [nova configuração] | configurar muted-role Mute",
    permissões: "Gerenciar servidor",
    disabled: false
};