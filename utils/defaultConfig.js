require('dotenv-flow');

module.exports = {
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    defaultSettings: {
        prefix: process.env.PREFIX,
        logsChannel: 'logs',
        reportChannel: 'reports',
        modRole: 'Moderador',
        adminRole: 'Administrador',
        mutedRole: 'Mutado'
    },
};