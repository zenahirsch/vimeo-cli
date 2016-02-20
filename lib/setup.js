var fs = require('fs');
var open = require('open');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

function authenticate () {
    open('https://api.vimeo.com/oauth/authorize?response_type=code&client_id=d77bdd27f05e5cff3a29ef8fcf5f77efc7dccd77&redirect_uri=http%3A%2F%2Fzena.land&scope=public%20private%20purchased%20create%20edit%20delete%20interact%20upload&state=banana');
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