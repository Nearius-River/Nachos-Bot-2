exports.run = async (bot, message, args, settings, member) => {
    let profile = await bot.getBotProfile();
    console.log(`Donos > ${profile.owners}`);
};

exports.help = {
    name: "test",
    aliases: ['testar', 'teste', 'experimentar'],
    categoria: "Desenvolvedor",
    descrição: "Testes",
    uso: "test ? {...} == true : resultado",
    permissões: "Desenvolvedor apenas",
    disabled: false
};