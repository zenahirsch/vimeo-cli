var fs = require('fs');
var open = require('open');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

function authenticate () {
}

function setup () {
    var config = {};

    if (fs.statSync('./config.json')) {
        config = require('./config.json');

        console.log('You\'re already connected to this account: ' + config.user);

        rl.question('Connect to a new account? [y/n]:', function (answer) {
            if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                runSetup();
            } else {
                rl.close();
            }
        });
    } else {
        authenticate();
    }
}

module.exports = setup;