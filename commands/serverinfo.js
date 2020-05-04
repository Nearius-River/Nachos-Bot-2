const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (bot, message, args, settings) => {
    let sicon = message.guild.iconURL;
    let option = args[0];
    let serverEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setThumbnail(sicon)
    .setTitle(`${message.guild.name} | ${message.guild.id}`);
    if (message.guild.region == 'brazil') {
        serverEmbed.addField("Região do servidor", 'Brasil');
    } else if (message.guild.region == 'eu-central') {
        serverEmbed.addField("Região do servidor", 'Europa Central');
    } else if (message.guild.region == 'hongkong') {
        serverEmbed.addField("Região do servidor", 'Hong Kong');
    } else if (message.guild.region == 'india') {
        serverEmbed.addField("Região do servidor", 'Índia');
    } else if (message.guild.region == 'japan') {
        serverEmbed.addField("Região do servidor", 'Japão');
    } else if (message.guild.region == 'russia') {
        serverEmbed.addField("Região do servidor", 'Rússia');
    } else if (message.guild.region == 'singapore') {
        serverEmbed.addField("Região do servidor", 'Singapura');
    } else if (message.guild.region == 'southafrica') {
        serverEmbed.addField("Região do servidor", 'África do Sul');
    } else if (message.guild.region == 'sydney') {
        serverEmbed.addField("Região do servidor", 'Sydney');
    } else if (message.guild.region == 'us-central') {
        serverEmbed.addField("Região do servidor", 'Estados Unidos Central');
    } else if (message.guild.region == 'us-east') {
        serverEmbed.addField("Região do servidor", 'Estados Unidos do Leste');
    } else if (message.guild.region == 'us-south') {
        serverEmbed.addField("Região do servidor", 'Estados Unidos do Sul');
    } else if (message.guild.region == 'us-west') {
        serverEmbed.addField("Região do servidor", 'Estados Unidos do Oeste');
    } else if (message.guild.region == 'eu-west') {
        serverEmbed.addField("Região do servidor", 'Europa do Leste');
    }
	//' Main filters '//
	const botFilter = message.guild.members.filter(m => m.user.bot).size;
    const humanFilter = message.guild.members.filter(m => m.user.bot == false).size;
    const textChannelFilter = message.guild.channels.filter(c => c.type == 'text').size;
    const voiceChannelFilter = message.guild.channels.filter(c => c.type == 'voice').size;
    const categoryFilter = message.guild.channels.filter(c => c.type == 'category').size;

    serverEmbed.addField("Dono do servidor", `${message.guild.owner.user.tag} | ${message.guild.owner.user.id}`);
    serverEmbed.addField("Criado em", moment(message.guild.createdAt).format('lll'));
    serverEmbed.addField("Você entrou em", moment(message.member.joinedAt).format('lll'));
    serverEmbed.addField(`Total de membros [${message.guild.members.size}]`, `**${humanFilter}** Humanos\n**${botFilter}** Bots\n**${message.guild.members.size}** Membros`, true);
    serverEmbed.addField(`Total de canais [${textChannelFilter + voiceChannelFilter + categoryFilter}]`, `**${textChannelFilter}** canais de texto\n**${voiceChannelFilter}** canais de voz\n**${categoryFilter}** categorias`, true);

    if (Math.floor(Math.random() * 3) == 2) {
        serverEmbed.setFooter("Dica: Para ver uma lista de cargos, digite serverinfo cargos ou clique na reação");
    }

    let Roles = message.guild.roles.sort((a,b) => {
        if (!a.position == 0 || !b.position == 0) {
            (b.position - a.position);
        }
    }).map(r => `<@&${r.id}>`).join(' | ');
    let Reactions = ['⬅️','➡️'];
    const Filter = (Reaction, user) => Reactions.includes(Reaction.emoji.name) && user.id == message.author.id;

    let roleEmbed = new Discord.RichEmbed()
    .setColor(process.env.INVISIBLE)
    .setTitle(`Total de cargos: ${message.guild.roles.size - 1}`)
    .setDescription(Roles);

    if (option && option == 'cargos' || option == 'roles') {
        return message.channel.send(roleEmbed).then(async msg => {
            await msg.react('⬅️');

            msg.awaitReactions(Filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            }).then(async () => {
                await msg.clearReactions();
                await msg.edit(serverEmbed);
            }).catch(() => {
                msg.clearReactions();
            });
        });
    }


    return message.channel.send(serverEmbed).then(async msg => {
        await msg.react('➡️');

        msg.awaitReactions(Filter, {
            max: 1,
            time: 60000,
            errors: ['time']
        }).then(async () => {
            await msg.clearReactions();
            await msg.edit(roleEmbed);
        }).catch(() => {
            msg.clearReactions();
        });
    });
};

exports.help = {
    name: "serverinfo",
    aliases: ['server', 'servidor'],
    categoria: "Informação",
    descrição: "Visualiza informações gerais sobre o servidor.",
    uso: "serverinfo [opção] | serverinfo cargos",
    permissões: "Nenhuma",
    disabled: false
};