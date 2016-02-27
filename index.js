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

program
    .command('list <item_name>')
    .description('List the specified items (videos, albums, followers, etc.)')
    .action((item_name) => {
        lib.getScript('list')(item_name);
    });

program
    .command('add <item_name>')
    .description('Add a new item (album, group, channel, etc.)')
    .option('-n, --name <name>', 'Specify a name')
    .option('-d, --description <description>', 'Specify a description')
    .option('-p, --privacy <privacy>', 'Specify a privacy')
    .option('-P, --password <password>', 'Specify a password')
    .option('-s, --sort <sort>', 'Specify a sort')
    .option('-u, --user <user_id>', 'Specify a user ID')
    .option('-v, --video <video_id>', 'Specify a video ID')
    .action((item_name, options) => {
        lib.getScript('add')(item_name, options);
    });


// Alias for `add user -u <user_id>`
program
    .command('follow <user_id>')
    .description('Follow the specified user.')
    .action((user_id) => {
        var options = {
            user: user_id
        };

        lib.getScript('add')('following', options);
    });

// Alias for `add like -v <video_id>`
program
    .command('like <video_id>')
    .description('Like the specified video.')
    .action((video_id) => {
        var options = {
            video: video_id
        };

        lib.getScript('add')('like', options);
    });

// Alias for `add watchlater -v <video_id>`
program
    .command('watchlater <video_id>')
    .description('Add the specified video to your watch later queue.')
    .action((video_id) => {
        var options = {
            video: video_id
        };

        lib.getScript('add')('watchlater', options);
    });


program.parse(process.argv);