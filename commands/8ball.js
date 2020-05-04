exports.run = async (bot, message, args, settings) => {
    if (!args[0]) return message.channel.send("Você precisa fazer uma pergunta completa. EX: *8ball eu tenho probleminha?");
    let replies = ["A bola mágica diz sim.", "A bola mágica diz não.", "Talvez...", "Talvez seja melhor perguntar outra hora.", "Sim, com toda certeza.", "Pelas aparências, sim.", "Não, com certeza.", "Sim, e foi inclusive confirmado pela NASA.", "Essa é uma pergunta difícil.", "Provavelmente.", "Pelas aparências, não."];
    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");
    if (question.includes("@everyone")) return message.channel.send("Você não pode mencionar everyone ou here nas perguntas.");
    if (question.includes("@here")) return message.channel.send("Você não pode mencionar everyone ou here nas perguntas.");

    message.channel.send('Hmm...').then(msg => setTimeout(() => {  msg.edit(replies[result]); }, 1200));

};

exports.help = {
    name: "8ball",
    aliases: ['bolamagica'],
    categoria: "Diversão",
    descrição: "Pergunte a poderosa bola mágica.",
    uso: "8ball <pergunta> | 8ball eu tenho probleminha",
    permissões: "Nenhuma",
    disabled: false
};