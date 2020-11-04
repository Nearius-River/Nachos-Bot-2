const fs = require('fs-extra');
const moment = require('moment');
moment.locale('pt-br');

exports.run = (bot, message, args) => {
  if (!bot.owners.includes(message.author.id)) return message.channel.send("Somente o desenvolvedor pode usar esse comando.");
  let replies = ["Flws ae pra quem fica", "Sayonara", "Hora de dormir", "Até a próxima", "Vejo você no outro mundo", "Te vejo em breve", "Bye bye", "Até um outro dia", "Hasta luego", "Ninguém nunca vai ver essa mensagem secreta que eu coloquei no bot mas caso alguém veja: 3^3", "Finalmente um descanso", "Posso dormir agora?"];
  let result = Math.floor((Math.random() * replies.length));
  let Count = 0;
  let CountTotal = 0;

  let Reactions = ['👋','🔁','😐'];
  const Filter = (Reaction, user) => Reactions.includes(Reaction.emoji.name) && user.id == message.author.id;
  message.channel.send(`Desligar o bot ou reiniciar?`).then(async msg => {
    await msg.react('👋');
    await msg.react('🔁');
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
          msg.edit(`O bot foi desligado. ${replies[result]}`);
          console.log('BOT | Bot desligado.'.warn);
          bot.updateLog(`—————————— Fim dos logs —————————— | ${moment(Date.now()).format('lll')} | —————`);
          bot.destroy();
          setTimeout(() => { process.kill(0); },1500);
          break;
        case '🔁':
          msg.reactions.removeAll();
          msg.edit(`Opa, foi mal! Essa função não está funcionando muito bem!`);
          // bot.updateActivity('Reiniciando... Aguarda ai!',4);

          // restartFiles();
          // console.log(`ARQUIVOS | Reiniciado um total de ${CountTotal} arquivos!`.ready);
          // msg.edit(`Feito! Reiniciado um total de ${CountTotal} arquivos!`);
          // bot.updateActivity('animes sem sentido',4);
          break;
        case '😐':
          msg.reactions.removeAll();
          msg.edit('Ok, comando cancelado.').then(m => m.delete(5000));
        break;
      }
    }).catch(async () => {
      await msg.reactions.removeAll();
      await msg.delete();
    });

    async function restartFiles() {
      await fs.readdir('./commands', (err, files) => {
        if (err) return console.error(err);
        msg.edit('Reiniciando comandos...');
        let file = files.filter(f => f.split('.').pop() == 'js');
        if (file.length <= 0 ) return;
        file.forEach(async f => {
          Count += 1;
          CountTotal += 1;
          delete require.cache[require.resolve(`./${f}`)];
          bot.commands.delete(f.split('.')[0]);
          let props = require(`./${f}`);
          bot.commands.set(f.split('.')[0], props);
        });
        Count = 0;
      });

      await fs.readdir('./utils', (err, files) => {
        if (err) return console.error(err);
        msg.edit('Reiniciado outros arquivos...');
        let file = files.filter(f => f.split('.').pop() == 'js');
        if (file.length <= 0 ) return;
        file.forEach(async f => {
          Count += 1;
          CountTotal += 1;
          delete require.cache[require.resolve(`../utils/${f}`)];
        });
        Count = 0;
      });
    }
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