const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
};

const profileSchema = mongoose.Schema({
    _id: reqString,
    economy: {
        coins: {
            type: Number,
            default: 0
        },
        deposit: {
            type: Number,
            default: 0
        },
    },
    profile: {
        level: {
            type: Number,
            default: 1
        },
        experience: {
            type: Number,
            default: 0
        },
        experienceTotal: {
            type: Number,
            default: 0
        },
        toNextLevel: {
            type: Number,
            default: 100
        },
    },
    reminds: {
        //finish later
    },
    botBlacklist: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('user-profile', profileSchema);