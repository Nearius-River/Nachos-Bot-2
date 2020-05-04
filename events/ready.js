const moment = require('moment');
moment.locale('pt-br');

module.exports = bot => {
  console.log(`BOT | ${bot.user.username} Online!\n`.ready);
  bot.user.setActivity("Bot sendo refeito", {type: "WATCHING"});
  bot.guilds.get('538548215914561537').channels.get('686761678247165955').send(`—————————— Início dos logs —————————— | ${moment(Date.now()).format('lll')} | —————\nBot iniciado normalmente. Evento :ready() executado.`);
};