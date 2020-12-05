const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
};

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: reqString,
    guildID: reqString,
    memberModeration: {
        warningsTotal: {
            type: Number,
            default: 0
        },
        warningsDetail: [],
    },
});

module.exports = mongoose.model('member-profile', profileSchema);