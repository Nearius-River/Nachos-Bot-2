const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Uhh você precisa de permissão administrativa ou gerenciar mensagens.");
    if(!args[0]) return message.channel.send("Você precisa especificar quantas mensagens serão apagadas. EX: *apagar 20");
    if(isNaN(args[0])) return message.channel.send("Uhh você não pode apagar usando letras.");
    if(args[0] <= 0) return message.channel.send("O número de mensagens a ser apagada precisa ser positivo.");

    if(args[0] <= 100){
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Foram apagadas ${args[0]} mensagens.`).then(msg => msg.delete(5000));
      });
    }

    if(args[0] >= 101 && args[0] < 201){
      message.channel.bulkDelete(100).then();

      message.channel.bulkDelete(Math.floor(args[0] - 100)).then(() => {
        message.channel.send(`Foram apagadas ${args[0]} mensagens.`).then(msg => msg.delete(5000));
      });
    }

    if(args[0] >= 201 && args[0] < 301){
      message.channel.bulkDelete(100).then();
      message.channel.bulkDelete(100).then();

      message.channel.bulkDelete(Math.floor(args[0] - 200)).then(() => {
        message.channel.send(`Foram apagadas ${args[0]} mensagens.`).then(msg => msg.delete(5000));
      });
    }

    if(args[0] >= 301 && args[0] < 401){
      message.channel.bulkDelete(100).then();
      message.channel.bulkDelete(100).then();
      message.channel.bulkDelete(100).then();

      message.channel.bulkDelete(Math.floor(args[0] - 300)).then(() => {
        message.channel.send(`Foram apagadas ${args[0]} mensagens.`).then(msg => msg.delete(5000));
      });
    }

    if(args[0] >= 401){
      message.channel.bulkDelete(100).then();
      message.channel.bulkDelete(100).then();
      message.channel.bulkDelete(100).then();
      message.channel.bulkDelete(100).then();

      message.channel.bulkDelete(Math.floor(args[0] - 400)).then(() => {
        message.channel.send(`Foram apagadas ${args[0]} mensagens.`).then(msg => msg.delete(5000));
      });
    }

    if(args[0] >= 501) return message.channel.send("Você só pode apagar até 500 mensagens enviadas nas 2 últimas semanas.");

    let logEmbed = new Discord.RichEmbed()
    .setTitle(`Ação | Limpar`)
    .setColor("#FFFFFF")
    .addField("Mensagens apagadas", `${args[0]}`)
    .addField("Apagadas por", `<@${message.author.id}> | ${message.author.id}`)
    .addField("Canal", message.channel)
    .setTimestamp();

    let logChannel = message.guild.channels.find(c => c.id === settings.logsChannel);
    if (!logChannel) return;
    logChannel.send(logEmbed);
};

exports.help = {
    name: "limpar",
    aliases: ['clean', 'clear'],
    categoria: "Moderação",
    descrição: "Limpa até 500 mensagens enviadas nas últimas 2 semanas.",
    uso: "limpar <quantidade> | limpar 20",
    permissões: "Gerenciar mensagens",
    disabled: false
};