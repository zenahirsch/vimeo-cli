const conf_utils = require(__dirname + '/../../conf_utils').setup();
const lib = require(__dirname + '/../');
const Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function buildReqOptions (options) {
    var req_options = {
        method: 'POST',
        path: '/channels',
        query: {
            name: options.name,
            description: options.description,
            privacy: options.privacy
        },
        headers: null
    };

    return req_options;
}

function addChannel (options) {
    const current_user = conf_utils.get('current_user');

    if (!current_user) {
        return console.log('No current user specified.');
    }

    if (typeof options.name !== 'string') {
        return console.log('Must include a channel name (use -n)');
    }

    if (typeof options.description !== 'string') {
        return console.log('Must include a channel description (use -d)');
    }

    if (typeof options.privacy !== 'string') {
        return console.log('Must include channel privacy (use -p)');
    }

    var req_options = buildReqOptions(options);

    if (req_options) {
        vimeo_lib = lib.constructVimeoLib(current_user);

        vimeo_lib.request(req_options, (err, body, status_code, headers) => {
            if (status_code === 400) {
                console.log();
                console.log(`    One or more of your params didn't make sense. Try again.`);
                console.log();
            } else if (status_code === 401) {
                console.log();
                console.log(`    Authorization problem: missing token.`);
                console.log();
            } else if (status_code === 403) {
                console.log();
                console.log(`    This user does not have permission to create channels.`);
                console.log('    Try `vimeo switch <nickname>` to switch to a different authenticated user.');
                console.log();
            } else if (status_code === 201) {
                console.log();
                console.log(`    Successfully created channel: ${body.name}`);
                console.log(`    Channel can be found at ${body.link}`);
                console.log();
            } else {
                console.log();
                console.log('    Not sure what happened, file a bug report.');
                console.log();
            }
        });
    }
}

module.exports = addChannel;