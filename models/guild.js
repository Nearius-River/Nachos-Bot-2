const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    ownerID: String,
    ownerUsername: String,
    cases: Number,
    prefix: String,
    logsChannel: String,
    reportChannel: String,
    modRole: String,
    adminRole: String,
    mutedRole: String,
    isBlacklisted: Boolean,
	guildInfoDate: Date
});

module.exports = mongoose.model('Guild', guildSchema);