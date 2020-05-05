const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    ownerID: String,
    cases: Number,
    prefix: String,
    logsChannel: String,
    reportChannel: String,
    modRole: String,
    adminRole: String,
    mutedRole: String,
    guildShop: {
        itens: [{
            name: String,
            price: Number
        }],
        enabled: Boolean
    },
    isBlacklisted: Boolean,
});

module.exports = mongoose.model('Guild', guildSchema);