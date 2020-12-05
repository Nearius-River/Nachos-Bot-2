const mongoose = require('mongoose');

const strUndefined = {
    type: String,
    default: undefined
};

const reqString = {
    type: String,
    required: true
};

const numDefault = {
    type: Number,
    default: 0
};

const guildSchema = mongoose.Schema({
    _id: reqString,
    prefix: reqString,
    channels: {
        logChannel: strUndefined,
        reportChannel: strUndefined
    },
    roles: {
        modRole: strUndefined,
        adminRole: strUndefined,
        mutedRole: strUndefined
    },
    moderation: {
        bans: numDefault,
        cases: numDefault,
    },
    botBlacklist: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('guild', guildSchema);