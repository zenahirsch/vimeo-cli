const conf_utils = require(__dirname + '/../../conf_utils').setup();
const lib = require(__dirname + '/../');
const Vimeo = require('vimeo').Vimeo;
var vimeo_lib = null;

function buildReqOptions (options) {
    var req_options = {
        method: 'PUT',
        path: `/me/following/${options.user}`,
        query: null,
        headers: null
    };

    return req_options;
}

function addFollowing (options) {
    const current_user = conf_utils.get('current_user');

    if (!current_user) {
        return console.log('No current user specified.');
    }

    if (typeof options.user !== 'string') {
        return console.log('Must include the ID of the user to follow (use -u)');
    }

    var req_options = buildReqOptions(options);

    if (req_options) {
        vimeo_lib = lib.constructVimeoLib(current_user);

        vimeo_lib.request(req_options, (err, body, status_code, headers) => {
            if (status_code === 403) {
                console.log();
                console.log('    The current user is not allowed to follow other users.');
                console.log('    Try `vimeo switch <nickname>` to switch to a different authenticated user.');
                console.log();
            } else if (status_code === 204) {
                console.log();
                console.log(`    Now following user: ${options.user}`);
                console.log(`    User can be found at https://vimeo.com/user${options.user}`);
                console.log();
            } else {
                console.log();
                console.log('    Not sure what happened, file a bug report.');
                console.log();
            }

        });
    }
}

module.exports = addFollowing;