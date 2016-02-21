#!/usr/bin/env node

var program = require('commander');
var pkg = require(__dirname + '/package');
var lib = require(__dirname + '/lib');

program
    .version(pkg.version)
    .description('A command line interface for Vimeo.');

program
    .command('setup <client_id> <client_secret>')
    .description('Setup utility. Do this before running `vimeo auth`')
    .action(function (client_id, client_secret) {
        lib.getScript('setup')(client_id, client_secret)
    });

program
    .command('auth')
    .description('Authenticate a new Vimeo account.')
    .action (function () {
        lib.getScript('auth')();
    });

program
    .command('use <nickname>')
    .description('Use the specified user to authenticate requests.')
    .action (function (nickname) {
        if (nickname) {
            lib.getScript('use')(nickname);
        }
    });

program
    .command('users')
    .description('List all authenticated users.')
    .action(function () {
        lib.getScript('users')();
    });

program
    .command('remove <nickname>')
    .description('Removes specified user from the utility.')
    .action(function (nickname) {
        if (nickname) {
            lib.getScript('remove')(nickname);
        }
    })

program
    .command('upload')
    .description('Upload a video or directory of videos.')
    .option('-f, --file <path>', 'Path to the specified file')
    .option('-d, --directory <path>', 'Path to the specified directory')
    .action(function (options) {
        lib.getScript('upload')(options);
    });

program.parse(process.argv);