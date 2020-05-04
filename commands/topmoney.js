const Discord = require('discord.js');
const { Profile } = require('../models');

exports.run = async (bot, message, args, settings) => {
    Profile.sort([['coins', 'descending']]).exec( async (err, result) => {
        if (err) console.error(err);
        let embed = new Discord.RichEmbed()
        .setTitle('Top usuários mais ricos');
        if (result.size === 10) {
            embed.setColor("#ff0000");
            embed.addField("Não foi possivel encontrar dados.", "Seja o primeiro a entrar para o placar!");
        } else if (result.size < 10) {
            embed.setColor("#FFFFFF");
            for (let i = 0; i < result.size; i++) {
              let member = message.guild.members.get(result[i].userID) || "Usuário não encontrado";
              if (member === "Usuário não encontrado"){
                embed.addField(`Top ${i + 1}: ${member}`, `Valor total: ${result[i].coins + result[i].depositado}`);
              } else {
                embed.addField(`Top ${i + 1}: ${member.user.username}`, `Valor total: ${result[i].coins + result[i].depositado}`);
              }
           }
        } else {
            embed.setColor("#FFFFFF");
            for(let i = 0; i < 10; i++) {
              let member = message.guild.members.get(result[i].userID) || "Usuário não encontrado";
              if(member === "Usuário não encontrado"){
                embed.addField(`${i + 1}, ${member}`, `Valor total: ${result[i].coins + result[i].depositado}`);
              } else {
                embed.addField(`${i + 1}, ${member.user.username}`, `Valor total: ${result[i].coins + result[i].depositado}`);
              }
            }
        }

        message.channel.send(embed);
    });
};

exports.help = {
    name: "topmoney",
    aliases: ['baltop', 'magnatas'],
    categoria: "Economia",
    descrição: "Checa o placar de magnatas.",
    uso: "topmoney",
    permissões: "Nenhuma",
    disabled: false
};