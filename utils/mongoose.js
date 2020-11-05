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

        //# Note: I actually had to change my password, sorry for my dumbness #//
        mongoose.connect('mongodb+srv://nearius-river:**************@cluster0-wl6m6.mongodb.net/nachos?retryWrites=true&w=majority', dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('MONGOOSE | Conexão Mongoose estabelecida com sucesso!'.ready);
        });

        mongoose.connection.on('err', err => {
            console.error(`MONGOOSE | Ocorreu um erro na conexão Mongoose.`.error + `\n${err.stack}`.warn);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MONGOOSE | Conexão Mongoose desestabelecida.'.warn);
        });
    }
};
