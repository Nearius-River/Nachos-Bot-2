const ms = require('ms');
const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    let toMute = message.mentions.members.first() || message.guild.members.find(u => u.user.id === args[0]) || message.guild.members.find(u => u.user.username === args[0]) || message.guild.members.find(u => `${u.user.username}#${u.user.discriminator}` === args[0]);
    if (!toMute) return message.channel.send('Não foi possivel encontrar o usuário!');
    if (toMute.id === "547967082952785933") return message.channel.send("Você tenta mutar o bot! É ineficaz!");
    if (toMute.id === "303235142283952128") return message.channel.send("Você não pode; ele é forte demais para você.");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Uhh você precisa de permissão administrativa ou cargo de mod.");
    if (toMute.hasPermission("MANAGE_MESSAGES") || toMute.roles.find(r => r.name == settings.modRole)) return message.channel.send("Uhh essa pessoa não pode ser mutada.");
    let muteRole = message.guild.roles.find(r => r.name === settings.mutedRole);
    if (toMute.roles.find(r => r.name == settings.mutedRole)) return message.channel.send('Esse usuário já está mutado.');
    if (!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name: settings.mutedRole,
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              });
        } catch (error) {
            console.error(error);
            return message.channel.send(`Ocorreu um erro. Reporte para o desenvolvedor: ${error.stack}`);
        }
    }

    let muteTime = args[1];
    if (!muteTime) return message.channel.send("Você precisa especificar o tempo do mute. EX: *mute @Monika 30m/2h/3d etc");
    if (muteTime <= 0) return message.channel.send("O tempo a ser mutado deve ser positivo.");
    let muteReason = args.slice(2).join(" ");
    if( !muteReason) muteReason = "Não especificado";

    await (toMute.addRole(muteRole.id));
    message.channel.send(`<@${toMute.id}> foi mutado por ${ms(ms(muteTime))}.`);
    let muteChannel = message.guild.channels.find(c => c.id == settings.logsChannel);
    if (!muteChannel) return;
    let autoMod = new Discord.RichEmbed().setTitle("Ação | Unmute").setColor("#317ee0").addField("Usuário desmutado", `${toMute} | ${toMute.id}`).addField("Desmutado por", bot.user.tag);

    setTimeout(function() {
        toMute.removeRole(muteRole.id);
        muteChannel.send(autoMod);
    }, ms(muteTime));

    let muteEmbed = new Discord.RichEmbed().setTitle(`Ação | Mute`).setColor("#faff2b").addField("Usuário mutado", `${toMute} | ${toMute.id}`).addField("Mutado por", `<@${message.author.id}> | ${message.author.id}`).addField("Tempo do mute", `${ms(ms(muteTime))}`).addField("Motivo", `${muteReason}`).setTimestamp();
    muteChannel.send(muteEmbed);

};

exports.help = {
    name: "mute",
    aliases: ['mutar', 'm'],
    categoria: "Moderação",
    descrição: "Muta um usuário por um tempo determinado.",
    uso: "mute <usuário> <tempo> [motivo] | mute @Near 300s falando merda",
    permissões: "Gerenciar mensagens",
    disabled: false
};