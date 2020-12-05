const chalk = require('chalk');

module.exports = (bot, replayed, shardID) => {
    console.log(chalk.white(`BOT | O bot foi reconectado ao WebSocket com sucesso.`));
    bot.updateLog(`Bot reconectado na Shard ${shardID} com sucesso. ${replayed} eventos foram re-executados.`);
};