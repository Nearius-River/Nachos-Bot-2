const mongoose = require('mongoose');

const botSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    commandUsageCount: Number,
    changelogs: [],
    owners: [],
    devs: [],
    botID: String,
    botPresenceMessage: []
});

module.exports = mongoose.model('Bot', botSchema);