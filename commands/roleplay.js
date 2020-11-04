const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
    let control = args[0];
    let options = args[1];
    let MessageEmbed = new Discord.MessageEmbed();
    MessageEmbed.setColor('#FFFFFF');

    switch(control) {
        case 'obter':
            switch(options) {
                case 'ficha':
                    var Reactions = ['1️⃣', '2️⃣'];
                    var Filter = (reaction, user) => Reactions.includes(reaction.emoji.name) && user.id == message.author.id;
                    return message.channel.send('1 = Ficha padrão/comum\n2 = Ficha improvisada/melhorada (na minha visão)').then(async msg => {
                        await msg.react('1️⃣');
                        await msg.react('2️⃣');

                        msg.awaitReactions(Filter, {
                            max: 1,
                            time: 30000,
                            errors: ['time']
                        }).then(async Collected => {
                            const Reaction = Collected.first();
                            switch (Reaction.emoji.name) {
                                case '1️⃣':
                                    msg.reactions.removeAll();
                                    return message.channel.send('```\n- Nome:\n\n- Apelido/s:\n\n- Raça:\n\n- Idade:\n\n- Gênero:\n\n- Problemas de Saúde:\n\n- Backstory:\n\n- Aparência:\n\n[Você pode censurar se preferir, mas contate um GM antes]\n[Caso algo não seja aplicável/desconhecido, ponha N/A ou ???]\n```');
                                case '2️⃣':
                                    msg.reactions.removeAll();
                                    return message.channel.send('```\n- Nome:\n\n- Apelido/s:\n\n- Raça:\n\n- Idade:\n\n- Altura e peso: [Opcional, apesar de recomendado para uma melhor compreensão sobre o personagem]\n\n- Idade:\n\n- Gênero:\n\n- Defeitos: [Opcional]\n\n- Gostos: [Opcional]\n\n- Traços da Personalidade:\n\n- Backstory:\n\n- Aparência:\n\n[Você pode censurar se preferir, mas contate um GM antes]\n[Caso algo não seja aplicável/desconhecido, ponha N/A ou ???]\n```');
                            }
                        }).catch(() => {
                            msg.reactions.removeAll();
                        });
                    });
            }
            message.channel.send('O que deseja obter? Se não souber, reenvie o comando sem argumentos.');
            break;
        default:
            MessageEmbed.setTitle('Ajuda | Roleplay | Argumentos');
            MessageEmbed.addField('Obter', 'ficha', true);
            MessageEmbed.addField('Adicionar', 'oque', true);
            MessageEmbed.addField('Remover', 'sei lá', true);
            return message.channel.send(MessageEmbed);
    }
};

exports.command = {
    aliases: ['rp'],
    description: "Várias utilidades para roleplays no Discord. Mais feito para as roleplays do Hyperium.",
    usage: "roleplay <obter> <o que você quiser> | roleplay obter ficha\nPara mais exemplos, apenas digite o comando sem argumentos para uma lista de opções.",
    commandPermissions: [],
    commandCategory: {
        administration: false,
        information: false,
        economy: false,
        util: true,
        music: false,
        development: false
    },
    disabled: false
};