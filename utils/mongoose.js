const mongoose = require('mongoose');

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

        mongoose.connect('mongodb://localhost:27017/nachos', dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('MONGOOSE | Conexão Mongoose estabelecida com sucesso!'.ready);
        });

        mongoose.connection.on('err', err => {
            console.error(`MONGOOSE | Erro na conexão Mongoose:\n${err.stack}`.error);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MONGOOSE | Conexão Mongoose desestabelecida.'.warn);
        });
    }
};