const fs = require('fs-extra');

exports.run = async (bot, message, args) => {
    if (!bot.isOwner(message.author)) return message.channel.send("Somente o desenvolvedor pode usar esse comando.");
    let comando = args[0];
    if (!comando || !bot.commands.has(comando) || comando == 'comandos') {
      fs.readdir('./commands', (err, files) => {
        if (err) return console.error(err);
        let file = files.filter(f => f.split(".").pop() === "js");
        file.forEach(async f => {
          delete require.cache[require.resolve(`./${f}`)];
          await bot.commands.delete(f.split('.')[0]);
          let props = require(`./${f}`);
          await bot.commands.set(props.help.name, props);
        });
      });
      return message.channel.send(`Beleza, todos os comandos foram reiniciados!`);
    }

    delete require.cache[require.resolve(`./${comando}.js`)];
    bot.commands.delete(comando);
    let propss = require(`./${comando}.js`);
    bot.commands.set(comando, propss);
    message.channel.send(`O comando **${comando}** foi reiniciado!`);
};

exports.help = {
    name: "reiniciar",
    aliases: ['restart', 'reload'],
    categoria: "Desenvolvedor",
    descrição: "Reinicia a cache de um ou todos os comandos.",
    uso: "reiniciar <comando>",
    permissões: "Desenvolvedor apenas",
    disabled: false
};