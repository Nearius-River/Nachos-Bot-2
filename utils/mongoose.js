const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect('mongodb+srv://nearius-river:Legal129*2013*@cluster0-wl6m6.mongodb.net/nachos?retryWrites=true&w=majority', dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log(chalk.white('MONGOOSE | Conexão Mongoose estabelecida com sucesso!'));
        });

        mongoose.connection.on('err', err => {
            console.error(chalk.red(`MONGOOSE | Ocorreu um erro na conexão Mongoose.`) + chalk.cyan(`\n${err.stack}`));
        });

        mongoose.connection.on('disconnected', () => {
            console.log(chalk.cyan('MONGOOSE | Conexão Mongoose encerrada.'));
        });
    },
	end: () => {
		mongoose.connection.close();
	}
};
