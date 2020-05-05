module.exports = (bot, replayed, shardID) => {
    console.log(`BOT | O bot foi reconectado ao WebSocket com sucesso.`.ready);
    bot.updateLog(`Bot reconectado na Shard ${shardID} com sucesso. ${replayed} eventos foram re-executados.`);
};