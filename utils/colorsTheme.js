const colors = require('colors');

const colorsTheme = {
    error: 'red',
    err: 'red',
    warn: 'cyan',
    loaded: 'yellow',
    ready: 'white',
    new: 'magenta',
    update: 'green',
    updated: 'green'
};

colors.setTheme(colorsTheme);