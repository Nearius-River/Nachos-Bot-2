module.exports = async (bot, member) => {

    const newProfile = {
        userID: member.id,
        username: member.user.tag
    };

    try {
        await bot.createProfile(newProfile);
    } catch (e) {
        console.error(e);
    }

};