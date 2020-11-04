const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (bot, message, args, settings) => {
    let sicon = message.guild.iconURL();
    let option = args[0];
    let serverEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} | ${message.guild.id}`, sicon)
    .setColor("#FFFFFF");

    switch (message.guild.region) {
        case 'eu-central':
            serverEmbed.addField("Região do servidor", "Europa Central");
            break;
        case 'brazil':
            serverEmbed.addField("Região do servidor", "Brasil");
            break;
        case 'hongkong':
            serverEmbed.addField("Região do servidor", "Hong Kong");
            break;
        case 'india':
            serverEmbed.addField("Região do servidor", "Índia");
            break;
        case 'japan':
            serverEmbed.addField("Região do servidor", "Japão");
            break;
        case 'russia':
            serverEmbed.addField("Região do servidor", "Rússia");
            break;
        case 'singapore':
            serverEmbed.addField("Região do servidor", "Singapura");
            break;
        case 'southafrica':
            serverEmbed.addField("Região do servidor", "África do Sul");
            break;
        case 'sydney':
            serverEmbed.addField("Região do servidor", "Sydney");
            break;
        case 'us-central':
            serverEmbed.addField("Região do servidor", "Centro dos Estados Unidos");
            break;
        case 'us-west':
            serverEmbed.addField("Região do servidor", "Oeste dos Estados Unidos");
            break;
        case 'us-south':
            serverEmbed.addField("Região do servidor", "Sul dos Estados Unidos");
            break;
        case 'us-east':
            serverEmbed.addField("Região do servidor", "Leste dos Estados Unidos");
            break;
        case 'eu-west':
            serverEmbed.addField("Região do servidor", "Leste da Europa");
            break;
    }
	//' Main filters '//
	const botFilter = message.guild.members.cache.filter(m => m.user.bot).size;
    const humanFilter = message.guild.members.cache.filter(m => m.user.bot == false).size;
    const textChannelFilter = message.guild.channels.cache.filter(c => c.type == 'text').size;
    const voiceChannelFilter = message.guild.channels.cache.filter(c => c.type == 'voice').size;
    const categoryFilter = message.guild.channels.cache.filter(c => c.type == 'category').size;

    serverEmbed.addField("Dono do servidor", `${message.guild.owner.user.tag} | ${message.guild.owner.user.id}`);
    serverEmbed.addField("Criado em", moment(message.guild.createdAt).format('lll'));
    serverEmbed.addField("Você entrou em", moment(message.member.joinedAt).format('lll'), );
    serverEmbed.addField(`Total de membros [${message.guild.members.cache.size}]`, `**${humanFilter}** Humanos\n**${botFilter}** Bots\n**${message.guild.members.cache.size}** Membros`, true);
    serverEmbed.addField(`Total de canais [${textChannelFilter + voiceChannelFilter + categoryFilter}]`, `**${textChannelFilter}** canais de texto\n**${voiceChannelFilter}** canais de voz\n**${categoryFilter}** categorias`, true);
    serverEmbed.setFooter(`Shard: ${message.guild.shard.id}`);

    let Roles = message.guild.roles.cache.sort((a,b) => {
        if (!a.position == 0 || !b.position == 0) {
            (b.position - a.position);
        }
    }).map(r => `<@&${r.id}>`).join(' | ');
    let Reactions = ['⬅️','➡️'];
    const Filter = (Reaction, user) => Reactions.includes(Reaction.emoji.name) && user.id == message.author.id;

    let roleEmbed = new Discord.MessageEmbed()
    .setColor(process.env.INVISIBLE)
    .setTitle(`Total de cargos: ${message.guild.roles.cache.size - 1}`)
    .setDescription(Roles);

    if (option && option == 'cargos' || option == 'roles') {
        return message.channel.send(roleEmbed).then(async msg => {
            await msg.react('⬅️');

            msg.awaitReactions(Filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(async () => {
                await msg.reactions.removeAll();
                await msg.edit(serverEmbed);
            }).catch(() => {
                msg.reactions.removeAll();
            });
        });
    }


    return message.channel.send(serverEmbed).then(async msg => {
        await msg.react('➡️');

        msg.awaitReactions(Filter, {
            max: 1,
            time: 30000,
            errors: ['time']
        }).then(async () => {
            await msg.reactions.removeAll();
            await msg.edit(roleEmbed);
        }).catch(() => {
            msg.reactions.removeAll();
        });
    });
};

exports.command = {
    aliases: [],
    description: "Visualiza informações gerais sobre o servidor.",
    usage: "serverinfo [opção] | serverinfo cargos",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: true,
        economy: false,
        util: false,
        music: false,
        development: false
    },
    disabled: false
};