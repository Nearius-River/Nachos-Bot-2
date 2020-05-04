const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    userID: String,
    username: String,
    coins: {
        type: Number,
        default: 0
    },
    depositado: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    experience: {
        type: Number,
        default: 0
    },
	totalExperience: {
		type: Number,
		default: 0
	},
    warnings: {
        type: Number,
        default: 0
    },
    warningsDetail: [],
    isBlacklisted: Boolean,
    //boosters: {
	//	name: String, time: Number
	//} -> Depois, quando eu fizer o comando de loja e possivelmente terminar
});

module.exports = mongoose.model('Profile', profileSchema);