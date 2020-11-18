const fs = require('fs-extra');
const moment = require('moment');
moment.locale('pt-br');

exports.run = (bot, message, args) => {
  if (!bot.owners.includes(message.author.id)) return message.channel.send("Somente o desenvolvedor pode usar esse comando.");
  let replies = ["Flws ae pra quem fica", "Sayonara", "Hora de dormir", "Até a próxima", "Vejo você no outro mundo", "Te vejo em breve", "Bye bye", "Até um outro dia", "Hasta luego", "Ninguém nunca vai ver essa mensagem secreta que eu coloquei no bot mas caso alguém veja: 3^3", "Finalmente um descanso", "Posso dormir agora?"];
  let result = Math.floor((Math.random() * replies.length));

  let Reactions = ['👋','😐'];
  const Filter = (Reaction, user) => Reactions.includes(Reaction.emoji.name) && user.id == message.author.id;
  message.channel.send(`Desligar o bot ou reiniciar?`).then(async msg => {
    await msg.react('👋');
    await msg.react('😐');

    msg.awaitReactions(Filter, {
      max: 1,
      time: 15000,
      errors: ['time']
    }).then(Collected => {
      const Reaction = Collected.first();
      switch (Reaction.emoji.name) {
        case '👋':
          msg.reactions.removeAll();
          msg.edit(`Conexão encerrada. ${replies[result]}`);
          console.log('BOT | Bot desligado.'.warn);
          bot.updateLog(`—————————— Fim dos logs ——————————— | ${moment(Date.now()).format('lll')} | —————`);
          bot.mongoose.end();
		  bot.setTimeout(function() {
            bot.destroy();
            process.kill(0);
          }, 3000);
          break;
        case '😐':
          msg.reactions.removeAll();
          msg.edit('Ok, comando cancelado.').then(m => m.delete(5000));
        break;
      }
    }).catch(function() {
      msg.delete();
    });
  });
};

exports.command = {
  aliases: ['dormir'],
  description: "Encerra a conexão do bot com os servidores do Discord.",
  usage: "",
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