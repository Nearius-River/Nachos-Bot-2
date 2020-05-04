module.exports = (bot, error) => {
    console.error(`ERRO | Foi encontrado um erro no bot.\n`.error + `${error.stack}`.warn);
};