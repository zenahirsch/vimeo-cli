#!/usr/bin/env node

const program = require('commander');
const pkg = require(__dirname + '/package');
const lib = require(__dirname + '/lib');

program
    .version(pkg.version)
    .description(pkg.description);

program
    .command('setup <client_id> <client_secret>')
    .description('Setup utility. Do this before running `vimeo auth`')
    .action((client_id, client_secret) => {
        lib.getScript('setup')(client_id, client_secret)
    });

program
    .command('auth')
    .description('Authenticate a new Vimeo account.')
    .action (() => {
        lib.getScript('auth')();
    });

program
    .command('use <nickname>')
    .description('Use the specified user to authenticate requests.')
    .action ((nickname) => {
        lib.getScript('use')(nickname);
    });

program
    .command('users')
    .description('List all authenticated users.')
    .action(() => {
        lib.getScript('users')();
    });

program
    .command('remove <nickname>')
    .description('Removes specified user from the utility.')
    .action((nickname) => {
        lib.getScript('remove')(nickname);
    });

program
    .command('upload <path>')
    .description('Upload a video.')
    .action((path) => {
        lib.getScript('upload')(path);
    });

program.parse(process.argv);