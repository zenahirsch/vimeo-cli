#!/usr/bin/env node

var program = require('commander');
var pkg = require(__dirname + '/package.json');
var lib = require(__dirname + '/lib');

program
    .version(pkg.version)
    .description('A command line interface for Vimeo.');

program
    .command('setup')
    .description('Connect to your Vimeo account.')
    .action (function () {
        lib.setup();
    });

program.parse(process.argv);

program.help();