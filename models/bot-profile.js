const mongoose = require('mongoose');

const botSchema = mongoose.Schema({
    _id: String,
    commandUsageCount: Number,
    changelogs: [],
    owners: [],
    devs: [],
});

module.exports = mongoose.model('bot', botSchema);