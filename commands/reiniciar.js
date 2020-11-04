const fs = require('fs-extra');

exports.run = async (bot, message, args) => {
    if (!bot.owners.includes(message.author.id)) return message.channel.send("Somente o desenvolvedor pode usar esse comando.");
	let comando = args[0];

	if (!comando || !bot.commands.has(comando) || comando == 'comandos') {
      fs.readdir('./commands', (err, files) => {
		if (err) return console.error(err);
		let file = files.filter(f => f.split(".").pop() == "js");

        file.forEach(async f => {
          delete require.cache[require.resolve(`./${f}`)];
          await bot.commands.delete(f.split('.')[0]);
          let props = require(`./${f}`);
          await bot.commands.set(f.split('.')[0], props);
		});
      });
      return message.channel.send(`Beleza, todos os comandos foram reiniciados!`);
    }

    delete require.cache[require.resolve(`./${comando}.js`)];
    bot.commands.delete(comando);
    let props = require(`./${comando}.js`);
    bot.commands.set(comando, props);
    message.channel.send(`O comando **${comando}** foi reiniciado!`);
};

exports.command = {
  aliases: ['restart'],
  description: "Reinicia a cache de um ou de todos os comandos.",
  usage: "reiniciar <comando>",
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